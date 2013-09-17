<?php
	//The output will be json
	header('Content-type: application/json');

	//Pickup the variables
	$api_key = "838cec44cf59198b22731f4be213988a";
	$location_id = $_GET['location_id'];

	//Create a URL
	
	$url = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/xml/" . $location_id . "?res=3hourly&key=" . $api_key
	
	//Obtain a response from the server
	$response = file_get_contents($url);

	//Write the contents of the file
	print $response;
?>