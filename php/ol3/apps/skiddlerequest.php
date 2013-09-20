<?php
	//The output will be json
	header('Content-type: application/json');
	
	//Pickup the variables
	$api_key = "838cec44cf59198b22731f4be213988a";
	$eventcode = $_GET['eventcode'];
	$latitude = $_GET['latitude'];
	$longitude = $_GET['longitude'];
	$radius = $_GET['radius'];
	
	//String validation
	if ($eventcode===''){
		//Create a URL
		$url = "http://www.skiddle.com/api/v1/events/?api_key=" . $api_key . "&latitude=";
		$url .= $latitude . "&longitude=" . $longitude . "&radius=" . $radius . "&limit=100&offset=0";	
	} else {
		//Create a URL
		$url = "http://www.skiddle.com/api/v1/events/?api_key=" . $api_key . "&eventcode=" . $eventcode . "&latitude=";
		$url .= $latitude . "&longitude=" . $longitude . "&radius=" . $radius . "&limit=100&offset=0";
	}
	
	//Obtain a response from the server
	$response = file_get_contents($url);
	
	//Write the contents of the file
	print $response;
?>
