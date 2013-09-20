<?php
	//The output will be json
	header('Content-type: application/json');

	//Pickup the variables
	$api_key = "dd35e920-4aff-4299-ac3b-11208b2ea163";
	$location_id = $_GET['location_id'];

	//Create a URL
	
	$url = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" . $location_id . "?res=3hourly&key=" . $api_key;
	
	//Obtain a response from the server
	$response = file_get_contents($url);

	//Write the contents of the file
	print $response;
?>
