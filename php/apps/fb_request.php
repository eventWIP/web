<?php
	//The output will be json
  header('Content-type: application/json');

  $rtype = $_GET['rtype'];
  $type = $_GET['type'];
  $q = $_GET['q'];
  $objID = $_GET['objID'];
  
  //$appsecret_proof = hash_hmac('sha256', '617411168311328', 'How do we hide the secret code?');
  
  if($rtype==1){
    $url = 'https://graph.facebook.com/search?q=' . $q . '&type=' . $type . '&access_token=617411168311328|234098';
  } elseif ($rtype==2){
    $url = 'https://graph.facebook.com/' . $objID . '?method=GET&format=json&suppress_http_code=1&access_token=617411168311328|234098';
  } elseif ($rtype==3){
    $url = 'https://graph.facebook.com/' . $objID . '/attending?method=GET&format=json&suppress_http_code=1&access_token=617411168311328|234098';
  } elseif ($rtype==4){
    $url = 'https://graph.facebook.com/' . $objID . '/maybe?method=GET&format=json&suppress_http_code=1&access_token=617411168311328|234098';
  }

	//Obtain a response from the server
  $response = file_get_contents($url);
  
  //Write the contents of the file
  print $response;
?>
