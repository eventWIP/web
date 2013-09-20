<?php

$rtype = $_GET['rtype'];
$type = $_GET['type'];
$q = $_GET['q'];
$objID = $_GET['objID'];

if($rtype==1){

  $url = 'https://graph.facebook.com/search?q=' . $q . '&type=' . $type . '&access_token=617411168311328|446eb7eebc20af4d5f9b780c883db247';
} elseif ($rtype==2){
  $url = 'https://graph.facebook.com/' . $objID . '?method=GET&format=json&suppress_http_code=1&access_token=617411168311328|446eb7eebc20af4d5f9b780c883db247';
} elseif ($rtype==3){
  $url = 'https://graph.facebook.com/' . $objID . '/attending?method=GET&format=json&suppress_http_code=1&access_token=617411168311328|446eb7eebc20af4d5f9b780c883db247';
} elseif ($rtype==4){
  $url = 'https://graph.facebook.com/' . $objID . '/maybe?method=GET&format=json&suppress_http_code=1&access_token=617411168311328|446eb7eebc20af4d5f9b780c883db247';
}

?>
