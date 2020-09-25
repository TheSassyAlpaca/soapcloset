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
			console.log("connected");
			$('#content').prepend('<button id="fBLogout">Logout</button>');
			//find a better home for the logout button - try the menu
			//hide login option
			
			
			expire=response.authResponse.data_access_expiration_time;
			userID=response.authResponse.userID;
			userType='Facebook';
			accessToken=response.authResponse.accessToken;
			userEmail='unlisted';
			console.log(response);
			FB.api(
				'/'+userID,
				'GET',
				{"fields":"picture,first_name,email"},
				function(response) {
					console.log(response);//
					console.log(response.first_name);//
					console.log(response.email);//
					console.log(response.picture.data.url);//
					userEmail=response.email;
					document.cookie='login'+userType+'='+userID+'|'+accessToken+'|'+userEmail+';expires='+expire+';path=/;domain=.thesassyalpaca.com';
					console.log(document.cookie);//
					setUser(response.first_name,response.email,response.picture.data.url);
				}
			);
			$('#fBLogout').click(FB.logout());
		} else {
			console.log(response.status);
			if(response.status=='unknown') {
				//checkLoginState();
			}
		}
	});
}

function setUser(n,e,p) {
	/*
	cookies=document.cookie;
	cookies.replace(/=/g,'":"');
	cookies.replace(/,/g,'","');
	cookies='{"'+cookies+'"}';
	JSON.parse(cookies);
	console.log(cookies);
	*/
	//if user header does not exist - create
	//change user portrait url, change user first name
	//add email to subscription field - run check on subscription - if found, hide subscription/thank user
	
	
	
	
}
