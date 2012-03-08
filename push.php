<?php
require_once 'urbanairship.php';

// Your testing data
$APP_MASTER_SECRET = 'ytJzO2raT3GAi1bWthfxFw';
$APP_KEY = 'eTc7cew2RsWIp3Ii5D6BnQ';
$TEST_DEVICE_TOKEN = '783A36E2B6766792D1CA1E7AE9540B424C970E085246A0D3841CC6C9A57167A7';
$TEST_USER = 'GjxRyvxQTCmTJa9F9tO2KQ';
$TEST_PIN = '30DF2BD4';

$pushMessage = $_POST['pushMessage'];
$richPushTitle = $_POST['richPushTitle'];
$richPushMessage = $_POST['richPushMessage'];

// Create Airship object
$airship = new Airship($APP_KEY, $APP_MASTER_SECRET);

// Test push

$push = array('aps'=>array('alert'=>$pushMessage));
$payload = array('push'=>$push, 'title'=>$richPushTitle, 'message'=>$richPushMessage);

$bbpayload = array('blackberry'=>array('content-type'=>'text/plain', 'body'=>$pushMessage));

$airship->broadcast($bbpayload, null);
$airship->broadcastRichPush($payload, null);

?>