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
fBL=`<div class="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>`;

$(function() {
	console.log("fBook loaded!");
	$('#content').prepend(fBL);
	$('body').prepend(fBJunk);
})


