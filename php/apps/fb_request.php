<?php

$rtype = $_GET['rtype'];
$type = $_GET['type'];
$q = $_GET['q'];

if($rtype==1){

  $url = 'https://graph.facebook.com/search?q=' . $q . '&type=' . $type . '&access_token=617411168311328|446eb7eebc20af4d5f9b780c883db247';
}

?>
