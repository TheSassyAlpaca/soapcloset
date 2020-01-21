var CLIENT_ID = '784038074621-jljtr1nq59a46k6jke32b8t7i2n25dmb.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAsDYa5kXFT4DWtrXNl_hk7qewINNR6m1A';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
//may not need this...
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
//these can go...
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');


function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function initClient() {
	gapi.client.init({
	apiKey: API_KEY,
	clientId: CLIENT_ID,
	discoveryDocs: DISCOVERY_DOCS,
	scope: SCOPES
	}).then(function () {
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		updateSigninStatus(gapi.auth2.getAuthInstance());
		serviceAuth();
		listMajors();
		//--   .isSignedIn.get()
		//authorizeButton.onclick = handleAuthClick;
		//signoutButton.onclick = handleSignoutClick;
	}, function(error) {
		appendPre(JSON.stringify(error, null, 2));
	});
}

function serviceAuth() {
	
}


let jwtClient = new google.auth.JWT(client_email, null, private_key, [
            "https://www.googleapis.com/auth/spreadsheets",
        ]);
//authenticate request
jwtClient.authorize(function(err, tokens) {
     // at this point the authentication is done you can now use `jwtClient` 
     // to read or write to the spreadsheet
	 console.log("I GOT HERE!");
});

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		//authorizeButton.style.display = 'none';
		//signoutButton.style.display = 'block';
		listMajors();
	} else {
		//authorizeButton.style.display = 'block';
		//signoutButton.style.display = 'none';
	}
	listMajors();
}

function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
	var pre = document.getElementById('content');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}

function listMajors() {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
		range: 'Class Data!A2:E',
	}).then(function(response) {
		var range = response.result;
		if (range.values.length > 0) {
			appendPre('Name, Major:');
			for (i = 0; i < range.values.length; i++) {
				var row = range.values[i];
		
				appendPre(row[0] + ', ' + row[4]);
			}
		} else {
			appendPre('No data found.');
		}
	}, function(response) {
		appendPre('Error: ' + response.result.error.message);
	});
}
