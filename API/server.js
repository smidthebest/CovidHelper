var express = require("express"); 
var app = express(); 
var bodyParser = require("body-parser"); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require("./router.js"); 
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-d978b4q3.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://localhost:8081',
  issuer: 'https://dev-d978b4q3.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Authorization", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")    next();
  });
router(app); 

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })