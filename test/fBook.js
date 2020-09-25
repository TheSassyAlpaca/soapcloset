$(function() {
	console.log("fBook loaded!");
	
})

function checkLoginState() {
	console.log('Checking Login');
	FB.getLoginStatus(function(response) {
		console.log(response);
		if(response.status=='connected') {
			console.log("connected");
			$('#content').prepend('<button id="fBLogout">Logout</button>');
			$('#fBLogout').click(FB.logout());
		} else {
			console.log(response.status);
			if(response.status=='unknown') {
				checkLoginState();
			}
		}
	});
}
