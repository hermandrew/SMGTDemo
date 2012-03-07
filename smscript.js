//Create User
function createUser() {
	var username = $('#accountNumber').val();
	var password = $('#password').val();
	var fName = $('#fName').val();
	var mName = $('#mName').val();
	var lName = $('#lName').val();
	
	alert("Creating");
	console.debug("User stuff:\n" + username + "\n" + password + "\n" + fName + "\n" + mName + "\n" + lName);
	
	var user = new StackMob.User({
		'username': username,
		'password': password,
		'first_name': fName,
		'middle_name': mName,
		'surname': lName
		//'deviceid': 09182374
	});
	
	user.create({
		success: handleUserCreated,
		error: handleError
	});
}

//Login
function login() {
	var username = $('#accountNumber').val();
	var password = $('#password').val();
	
	alert("logging in2");
	var user = new StackMob.User({ 
		'username': username,
		'password': password
	});
	alert("User Built, trying login...");
	// The BOOL indicates a "Keep Logged In" that is not implemented as of 3/7
	user.login(false, {
		success: handleLoggedIn,
		error: handleError
	});
	alert("Loggin'");
}

function fetchUser() {
	var username = $('accountNumber').val();
	
	alert("Fetching User");
	
	var user = new StackMob.User({
		'username': username
	});
	
	user.fetch({
		success:handleUserFetched,
		error: handleError
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
	alert("about to console log...");
	console.debug("Logged In");
	alert("console loggin'...");
	if(model) {
		console.debug(model.toJSON());
	}
	alert("about to fetch user");
	fetchUser();
	alert("user fetched");
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
	alert(response.error);
	if(response) {
		console.debug(response);
	}
}