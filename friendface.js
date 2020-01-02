window.fbAsyncInit = function() {
	FB.init({
		appId      : '584847252330296',
		cookie     : true,
		xfbml      : true,
		version    : 'v5.0'
	});
	FB.AppEvents.logPageView();
	checkLoginState();
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		//statusChangeCallback(response);
		console.log(response);
		if(response.status==='connected') {
			console.log(response.authResponse.userID);
			console.log('https://graph.facebook.com/'+response.authResponse.userID+'/picture?type=square');
			createOrFindUser(response.authResponse.userID,response.authResponse.accessToken,'facebook');
		} else {
			console.log("Error?");
		}
	});
}

function endLoginStatus() {
	FB.logout(function(response) {
		console.log(response);
		if(response.status!=='connected') {
			console.log("Logout responded");
			//$('#logout').css('display','none');
			//$('#login-button').css('display','block');
			endUser('facebook');
		}
	});
}

$(function() {
	$('#logout').click(function() {
		console.log("Logout clicked");
		endLoginStatus();
	});
})
