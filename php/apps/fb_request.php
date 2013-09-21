<?php
	//The output will be json
  header('Content-type: application/json');

  $rtype = $_GET['rtype'];
  $type = $_GET['type'];
  $q = $_GET['q'];
  $objID = $_GET['objID'];
  
  //How do we hide the secret code?
  //$appsecret_proof = hash_hmac('sha256', '617411168311328', 'How do we hide it?');
  
  if($rtype==1){
    $url = 'https://graph.facebook.com/search?q=' . $q . '&type=' . $type . '&access_token=CAACEdEose0cBAAO10qnRkyuiFtwiz1fLP2X1g3pJiT0aCHpJMbwk9JKfCEviuhUA3q4PhA5ZA1AVU6eW9jsKvW2A58UQ8WTgQZCSuO4tx7mqz3anjgdKksd1ZAeFhrKAhgYOZADK3PwZAeAZCZB8pJkBAqfCvnUMmGfMK76rCxfKZCP2Fhfm05qn0pIZBAUMrsxMh5NxssQzd2QZDZD';
  } elseif ($rtype==2){
    $url = 'https://graph.facebook.com/' . $objID . '?method=GET&format=json&suppress_http_code=1&access_token=CAACEdEose0cBAAO10qnRkyuiFtwiz1fLP2X1g3pJiT0aCHpJMbwk9JKfCEviuhUA3q4PhA5ZA1AVU6eW9jsKvW2A58UQ8WTgQZCSuO4tx7mqz3anjgdKksd1ZAeFhrKAhgYOZADK3PwZAeAZCZB8pJkBAqfCvnUMmGfMK76rCxfKZCP2Fhfm05qn0pIZBAUMrsxMh5NxssQzd2QZDZD';
  } elseif ($rtype==3){
    $url = 'https://graph.facebook.com/' . $objID . '/attending?method=GET&format=json&suppress_http_code=1&access_token=CAACEdEose0cBAAO10qnRkyuiFtwiz1fLP2X1g3pJiT0aCHpJMbwk9JKfCEviuhUA3q4PhA5ZA1AVU6eW9jsKvW2A58UQ8WTgQZCSuO4tx7mqz3anjgdKksd1ZAeFhrKAhgYOZADK3PwZAeAZCZB8pJkBAqfCvnUMmGfMK76rCxfKZCP2Fhfm05qn0pIZBAUMrsxMh5NxssQzd2QZDZD';
  } elseif ($rtype==4){
    $url = 'https://graph.facebook.com/' . $objID . '/maybe?method=GET&format=json&suppress_http_code=1&access_token=CAACEdEose0cBAAO10qnRkyuiFtwiz1fLP2X1g3pJiT0aCHpJMbwk9JKfCEviuhUA3q4PhA5ZA1AVU6eW9jsKvW2A58UQ8WTgQZCSuO4tx7mqz3anjgdKksd1ZAeFhrKAhgYOZADK3PwZAeAZCZB8pJkBAqfCvnUMmGfMK76rCxfKZCP2Fhfm05qn0pIZBAUMrsxMh5NxssQzd2QZDZD';
  }

  //Obtain a response from the server
  $response = file_get_contents($url);
  
  //Write the contents of the file
  print $response;
?>
