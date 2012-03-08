<?php
require_once 'urbanairship.php';

// Your testing data
$APP_MASTER_SECRET = 'ytJzO2raT3GAi1bWthfxFw';
$APP_KEY = 'eTc7cew2RsWIp3Ii5D6BnQ';

// Create Airship object
$airship = new Airship($APP_KEY, $APP_MASTER_SECRET);

$deviceList = $airship->get_device_tokens();

$testing = "testing";

?>

<!DOCTYPE html>

<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="HandheldFriendly" content="true" />
		<meta name="x-blackberry-defaultHoverEffect" content="true" />
		<link rel="stylesheet" href="style.css">
		
		<title>
			Send Push
		</title>
	</head>
	<body>
		<nav>
			<b>
				Send Push Notifications
			</b>
		</nav>
		<form action="push.php" method="post" id="push_form">
			<input type="text" class="field standard" value="Push Message" name="pushMessage" id="message">
			<input type="text" class="field standard" value="Rich Push Title" name="richPushTitle">
			<textarea id="id_message" class="field standard" rows="10" cols="40" name="richPushMessage">&lt;h1&gt;Hi there!&lt;/h1&gt;
&lt;p&gt;This is a message from Urban Airship!&lt;/p&gt;</textarea> <br />
			
			<!-- <input type="radio" name="audience" value="Broadcast" checked="true" onclick="javascript:broadcast()">Broadcast<br>
			<input type="radio" name="audience" value="Choose User" checked="false" onclick="javascript:chooseUser()">Choose User<br>
			
			<input type="checkbox" name="platform" value="iOS" checked="true" />iOS<br>
			<input type="checkbox" name="platform" value="BlackBerry" checked="true" />BlackBerry<br> -->
			
			
			<?php
				echo "<select>\n";
				$indexToken = 'device_token';
				foreach($deviceList as $key=>$value)
				{
					$device = $value->$indexToken;
					echo "<option value=\"" . $device . "\">" . $device . "</option>\n";
				}
				echo "</select>";
			?>
			<input type="submit" class="button standard" value="Send Push!" name="">
		</form>
	</body>
</html>
