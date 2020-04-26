<?php

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
$url = $_SERVER["REQUEST_URI"];

if($requestMethod == "GET"){
    $path = Explode("/", $url); 
    
}

?>