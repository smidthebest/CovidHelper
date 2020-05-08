package com.gavinkhung.covidhelper;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.HttpResponse;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private FirebaseAuth mAuth;
    private FirebaseUser currentUser;
    private FirebaseFirestore db;

    private FusedLocationProviderClient fusedLocationClient;

    private ArrayList<Order> orders;
    private RequestQueue queue;

    private volatile Object ordersLock = new Object();
    private final String KEY = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlltSUc4YWNmTkV0c1hPT0FwY05qdSJ9.eyJpc3MiOiJodHRwczovL2Rldi1kOTc4YjRxMy5hdXRoMC5jb20vIiwic3ViIjoidDJRWXNQM01aQTRyc2FzbmlNMTN4MlZWRm1CalNmODRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjgwODEiLCJpYXQiOjE1ODg5MjE2NzUsImV4cCI6MTU4OTAwODA3NSwiYXpwIjoidDJRWXNQM01aQTRyc2FzbmlNMTN4MlZWRm1CalNmODQiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.CaqVIpLRGHR39o76GXgkWNvlkzl7eqXT80DJAs9WLcATS1KWahtQiSxCHyx5h87z4MkgNb3UWxHMFbx7ruHmA6wlLOYAh79penPrez2G3JTUUsnI2LRwEQamhBD0Ugd6qTjaUQUoE7ZX0yLUILLUxCJxE1GTE_X3Y4izyqVuSlr_tfuGonBbpnm4O2AK6FMS28czp5dIGFquuSGqjXKl9gIguz6nHVtswoBM4QgrdNfWK7fy4fq_gvfDYdX9_TRUCJkYBdLML_vjpUn6Jox6GCT5PylC0HNUMZ5ph0M57cdQhVzt5ncHdJz_T5fPvw2hfCOk0UbMar4VpK5-scQTzA";

    // allows you to send Message and Runnable objects to the MessageQueue
    // the thread bounded to the handler is the thread that initialized the handler
    // so the main thread is bound to the handler
    private Handler mainHandler = new Handler(Looper.getMainLooper());

    // loops through the MessageQueue

    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        final RecyclerView rvOrders = findViewById(R.id.recyclerView);
        orders = new ArrayList<Order>();
        orders.add(new Order("1", "", "1", "", "", "", ""));
        //orders.add(new Order("2", "", "2", "", "", "", ""));
        /*
        OrderAdapter adapter = new OrderAdapter(orders);
        rvOrders.setAdapter(adapter);
        rvOrders.setLayoutManager(new LinearLayoutManager(this));
         */

        // INITIALIZE FIREBASE
        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();

        // CHECK if user is signed in (non-null) and update UI accordingly.
        currentUser = mAuth.getCurrentUser();
        //updateUI(currentUser);

        // SIGN IN with username and password
        //createNewUser("a@a.com", "a123456789");
        //signInUser("a@a.com", "a123456789");


        // LOCATIONS
        //fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        //getLocation()


        // REQUEST
        queue = Volley.newRequestQueue(this);


        try {
            Thread t = new Thread(new Runnable() {
                @Override
                public void run() {
                    synchronized (ordersLock){
                        try {
                            ordersLock.wait();
                            mainHandler.post(new Runnable() {
                                @Override
                                public void run() {
                                    OrderAdapter adapter = new OrderAdapter(orders);
                                    rvOrders.setAdapter(adapter);
                                    rvOrders.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                                }
                            });
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            });
            t.start();

        } catch(Exception e){
            e.printStackTrace();
        }


        try {
            Thread t = new Thread(new Runnable() {
                @Override
                public void run() {
                    requestWithSomeHttpHeaders();
                }
            });
            t.start();
        } catch (Exception e){

        }

        // http request
        //request("http://www.google.com");


        // CREATE NOTIFICATION
        //createNotification();

        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                    @Override
                    public void onComplete(@NonNull Task<InstanceIdResult> task) {
                        if (!task.isSuccessful()) {
                            Log.w("TAG", "getInstanceId failed", task.getException());
                            return;
                        }

                        // Get new Instance ID token
                        String token = task.getResult().getToken();

                        // Log and toast
                        Log.d("NEWTOKEN", token);
                        Toast.makeText(MainActivity.this, token, Toast.LENGTH_SHORT).show();
                    }
                });
    }

    public void createNotification(){
        final String CHANNEL_ID = new String("1");
        final int notificationId = 1;

        // CREATE an explicit intent for an Activity in your app
        //Intent intent = new Intent(this, AlertDetails.class);
        //intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        //PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);

        // CREATE notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentTitle("My notification")
                .setContentText("Hello World!")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);
                // Set the intent that will fire when the user taps the notification
                //.setContentIntent(pendingIntent)
                //.setAutoCancel(true);

        // CREATE the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String channel_name = "1";
            String channel_description = "1";
            CharSequence name = channel_name;
            String description = channel_description;
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }


        // CREATE NEW TOKEN
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(notificationId, builder.build());
    }

    public void getLocation(){
        fusedLocationClient.getLastLocation()
                .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        // Got last known location. In some rare situations this can be null.
                        if (location != null) {
                            // Logic to handle location object
                            Log.d("location", location.toString());
                        } else {
                            Log.d("location", "no location");
                        }
                    }
                });
    }

    public void request(String url){
        //String url = "http://www.google.com";

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("response", response);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("response", error.toString());
            }
        });
        queue.add(stringRequest);
    }

    public void createNewUser(String email, String password){
        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d("TAG", "createUserWithEmail:success");
                            FirebaseUser user = mAuth.getCurrentUser();
                            //updateUI(user);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w("TAG", "createUserWithEmail:failure", task.getException());
                            Toast.makeText(getApplicationContext(), "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();
                            //updateUI(null);
                        }

                    }
                });
    }

    public void signInUser(String email, String passwword){
        mAuth.signInWithEmailAndPassword(email, passwword)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d("TAG", "signInWithEmail:success");
                            FirebaseUser user = mAuth.getCurrentUser();
                            //updateUI(user);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w("TAG", "signInWithEmail:failure", task.getException());
                            Toast.makeText(getApplicationContext(), "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();
                            //updateUI(null);
                            // ...
                        }

                        // ...
                    }
                });
    }

    public void signOutUser(){
        FirebaseAuth.getInstance().signOut();
    }

    public void createDocument(){
        Map<String, Object> city = new HashMap<>();
        city.put("name", "Los Angeles");
        city.put("state", "CA");
        city.put("country", "USA");

        db.collection("cities").document("LA")
                .set(city)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.d("TAG", "DocumentSnapshot successfully written!");
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w("TAG", "Error writing document", e);
                    }
                });
    }

    public void readDocument(){
        DocumentReference docRef = db.collection("cities").document("SF");
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        Log.d("TAG", "DocumentSnapshot data: " + document.getData());
                    } else {
                        Log.d("TAG", "No such document");
                    }
                } else {
                    Log.d("TAG", "get failed with ", task.getException());
                }
            }
        });
    }

    // this updates one field without overwriting the document
    public void updateField(){
        DocumentReference washingtonRef = db.collection("cities").document("DC");
        washingtonRef
                .update("capital", true,
                        "age", 13,
                        "favorites.color", "Red")
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.d("TAG", "DocumentSnapshot successfully updated!");
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w("TAG", "Error updating document", e);
                    }
                });

    }

    public void deleteDocument(){
        db.collection("cities").document("DC")
                .delete()
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.d("TAG", "DocumentSnapshot successfully deleted!");
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w("TAG", "Error deleting document", e);
                    }
                });
    }


    public void requestWithSomeHttpHeaders() {
        String url = "http://covidhelpr-env.eba-anxf3q8x.us-west-1.elasticbeanstalk.com/db/volunteers";
        Log.w("NOTIFY", "REQUEST STARTED");
        StringRequest getRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        Log.d("Response TO AWS", response);
                        try {
                            JSONObject json = new JSONObject(response);
                            Iterator<String> keys = json.keys();
                            while (keys.hasNext()) {
                                String key = keys.next();
                                orders.add(new Order("", "", json.get(key).toString(), "", "", "", ""));
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        synchronized (ordersLock){
                            ordersLock.notify();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("ERROR","error => "+error.toString());
                    }
                }
        ) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("authorization", KEY);
                return params;
            }
        };
        queue.add(getRequest);
    }




}