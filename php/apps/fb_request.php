<?php
	//The output will be json
  header('Content-type: application/json');

  $rtype = $_GET['rtype'];
  $type = $_GET['type'];
  $q = $_GET['q'];
  $q = str_replace(" ","+",$q);
  $objID = $_GET['objID'];
  
  //How do we hide the secret code?
  //$appsecret_proof = hash_hmac('sha256', '617411168311328', 'How do we hide it?');
  
  if($rtype==1){
    $url = 'https://graph.facebook.com/search?q=' . $q . '&type=' . $type . '&access_token=CAACEdEose0cBAMXgw65a8BVqPrhGuEllNpUnQ5Gsfl8ZCOrzOZCTjoe4TYNkqmCxA2ut8YUQnSGWapNHZCMWtZAzkxxYEqhUzoZCnstqnz5gkfZApWjYDZC7p1o3dz3hOKnIBSr3ZBrlQbMTUdFUuKAveEWkSyKWGKQAmZAcgsUCSUK7IgSzJeB7darZBX9QFuVSAImnhu7BldkQZDZD';
  } elseif ($rtype==2){
    $url = 'https://graph.facebook.com/' . $objID . '?method=GET&format=json&suppress_http_code=1&access_token=CAACEdEose0cBAMXgw65a8BVqPrhGuEllNpUnQ5Gsfl8ZCOrzOZCTjoe4TYNkqmCxA2ut8YUQnSGWapNHZCMWtZAzkxxYEqhUzoZCnstqnz5gkfZApWjYDZC7p1o3dz3hOKnIBSr3ZBrlQbMTUdFUuKAveEWkSyKWGKQAmZAcgsUCSUK7IgSzJeB7darZBX9QFuVSAImnhu7BldkQZDZD';
  } elseif ($rtype==3){
    $url = 'https://graph.facebook.com/' . $objID . '/attending?method=GET&format=json&suppress_http_code=1&access_token=CAACEdEose0cBAMXgw65a8BVqPrhGuEllNpUnQ5Gsfl8ZCOrzOZCTjoe4TYNkqmCxA2ut8YUQnSGWapNHZCMWtZAzkxxYEqhUzoZCnstqnz5gkfZApWjYDZC7p1o3dz3hOKnIBSr3ZBrlQbMTUdFUuKAveEWkSyKWGKQAmZAcgsUCSUK7IgSzJeB7darZBX9QFuVSAImnhu7BldkQZDZD';
  } elseif ($rtype==4){
    $url = 'https://graph.facebook.com/' . $objID . '/maybe?method=GET&format=json&suppress_http_code=1&access_token=CAACEdEose0cBAMXgw65a8BVqPrhGuEllNpUnQ5Gsfl8ZCOrzOZCTjoe4TYNkqmCxA2ut8YUQnSGWapNHZCMWtZAzkxxYEqhUzoZCnstqnz5gkfZApWjYDZC7p1o3dz3hOKnIBSr3ZBrlQbMTUdFUuKAveEWkSyKWGKQAmZAcgsUCSUK7IgSzJeB7darZBX9QFuVSAImnhu7BldkQZDZD';
  }

  //Obtain a response from the server
  $response = file_get_contents($url);
  
  //Write the contents of the file
  print $response;
?>
