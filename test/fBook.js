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
	setUser('Facebook',null);
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
					setUser('Facebook',response.first_name,response.email,response.picture.data.url);
				}
			);
			$('#fBLogout').click(FB.logout());
			//delete user data in cookie
		} else {
			console.log(response.status);
			if(response.status=='unknown') {
				//checkLoginState();
			}
		}
	});
}

function setUser(t,n,e,p) {
	//if user header exists, delete
	//empty input field for subscription
	//--other items to undo in preparation for new user
	
	//if n==null
	//search cookies for 'userFacebook' and apply traits to n,e,p
	if(n==null) {
		cookies=document.cookie;
		cookies=cookies.split('; ');
		for(i=0;i<cookies.length;i++) {
			cookies[i]=cookies[i].replace('=','":"');
			console.log(cookies[i]);
		}
		cookies=cookies.join('","');
		cookies='{"'+cookies+'"}';
		JSON.parse(cookies);
		if(cookies['user'+t]==n+"|"+e+"|"+p) {
			console.log("yes")
		} else {
			user=cookies['user'+t];
			user=user.split("|");
			n=user[0];
			e=user[1];
			p=user[2];
			console.log(user);
		}
	}
	
	
	//if n!=null
	//create user header - set user portrait url, user first name
	//add email to subscription field - run check on subscription - if found, hide subscription/thank user
	//check for 'cart+userID' and adopt cart
		//if no 'cart+userID' exists and 'cart' is occupied, ask if user would like to claim this cart
			//if no, create new empty cart using their userID
			//if yes, copy cart to 'cart+userID'
	
	//if n==null
	//search cookies for 'userFacebook' and apply traits to n,e,p
	
}
