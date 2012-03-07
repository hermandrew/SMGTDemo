//Create User
function createUser() {
	var username = $('#accountNumber').val();
	var password = $('#password').val();
	var fName = $('#fName').val();
	var mName = $('#mName').val();
	var lName = $('#lName').val();
	
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
	
	var user = new StackMob.User({ 
		'username': username,
		'password': password
	});
	
	// The BOOL indicates a "Keep Logged In" that is not implemented as of 3/7
	user.login(false, {
		success: handleLoggedIn,
		error: handleError
	});
}

function fetchUser() {
	var username = $('accountNumber').val();
	
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
	console.debug("Logged In");
	if(model) {
		console.debug(model.toJSON());
	}
	
	fetchUser();
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
	console.debug(response);
	alert(response.error);
}