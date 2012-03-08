//Create User
function createUser() {
	var username = $('#accountNumber').val();
	var password = $('#password').val();
	var fName = $('#fName').val();
	var mName = $('#mName').val();
	var lName = $('#lName').val();
	
	console.debug("User stuff:\n" + username + "\n" + password + "\n" + fName + "\n" + mName + "\n" + lName);
	log("Creating");
	
	var user = new StackMob.User({
		'username': username,
		'password': password,
		'first_name': fName,
		'middle_name': mName,
		'surname': lName
		//'deviceid': 09182374
	});
	
	user.create({
		'success': handleUserCreated,
		'error': handleError
	});
}

//Login
function login() {
	var username = $('#accountNumber').val();
	var password = $('#password').val();
	
	log("Loggin in");
	var user = new StackMob.User({ 
		"username": username,
		"password": password
	});

	log("User built, trying login...");
	// The BOOL indicates a "Keep Logged In" that is not implemented as of 3/7
	user.login(false, {
		"success": handleLoggedIn,
		"error": handleError
	});

	log("loggin' in");
}

function fetchUser() {
	var username = $('accountNumber').val();
	var user = new StackMob.User({
		'username': username
	});
	
	log("Getting PIN");
	getPIN();
	
	/*user.fetch({
		success: handleUserFetched,
		error: handleError
	});*/
}

function getPIN() {
	log("Getting PIN?...");
	log("PIN property: " + 
	$.ajax({
		type: "get",
	    url: "http://localhost:8472/blackberry/identity/get",
	    success: function(msg) {
	    	log("Returned from LocalHost");
	    	log("Pin: " + JSON.parse(msg).data);
	    	alert(JSON.parse(msg).data);
		}
		error: function(jqXHR, textStatus, errorThrown) {
			log("ERROR!");
			log("Error: " + errorThrown);
		}
	});
}

function handleUserCreated(model) {
	console.debug("User Created!");
	if(model) {
		console.debug(model.toJSON());
	}
	
	login();
}

function handleLoggedIn(model) {

	if(model) {
		console.debug(model.toJSON());
	}
	log("Fetchin' user...");
	fetchUser();
	log("User fetched?");
}

function handleUserFetched(model) {
	console.debug("User fetched!");
	if(model) {
		console.debug(model.toJSON());
	}
	
	window.location = "local:///index.html";
}

// Error handler
function handleError(model, response) {
	log("ERROR!");
	if(response) {
		log(response.error);
		console.debug(response);
	}
}

// Test Text
function log(str) {
	$('p').html($('p').html() + "<br>" + str);
}

