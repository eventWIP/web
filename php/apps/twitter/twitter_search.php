<?php
header('Content-type: application/json');


$terms = urlencode($_GET['terms']);

require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "782161298-DleMyseV9SykaiSdd5EfUrP3rzYeGBagkVJjM1rn",
    'oauth_access_token_secret' => "JOr5MnaZKOdDZXs80WC1oecbryFurUrTNBDKDxPaigo",
    'consumer_key' => "ZAkRSLbEGTLvbykuXUlXBg",
    'consumer_secret' => "s2PLwbsxtAOWWQqpNY7N8PdRsHqYbzLScZGutNSn5E"
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$requestMethod = 'GET';
$getfield = '?q=' . $terms . '&count=100';

// Perform the request
$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
             
print $response;
             
?>
