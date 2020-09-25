fBJunk=`<script>
		  window.fbAsyncInit = function() {
			FB.init({
			  appId      : '584847252330296',
			  cookie     : true,
			  xfbml      : true,
			  version    : 'v7.0'
			});
			  
			FB.AppEvents.logPageView();   
			FB.getLoginStatus(function(response) {
				console.log(response);
			});
		  };

		  (function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "https://connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>`
fBL=`<div class="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width="" scope="public_profile,email" onlogin="checkLoginState();"></div>`;

$(function() {
	console.log("fBook loaded!");
	$('body').prepend(fBJunk);
	$('#content').prepend(fBL);
})

function checkLoginState() {
	console.log('Checking Login');
	FB.getLoginStatus(function(response) {
		console.log(response);
		if(response.status=='connected') {
			console.log(response.status);
			console.log("connected");
			$('#content').prepend('<button id="fBLogout">Logout</button>');
			$('#fBLogout').click(FB.logout());
		} else {
			console.log(response.status);
			if(response.status=='unknown') {
				//checkLoginState();
			}
		}
	});
}
