//fLogButton='<div class="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>';
/*fBScript=`<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '584847252330296',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v7.0'
    });
  };
</script>
<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>`
*/
$(function() {
	console.log("fBook loaded!");
	//$('body').prepend(fBScript);
	//$('#content').append(fLogButton);
	FB.getLoginStatus(function(response) {
		console.log(response);
		//statusChangeCallback(response);
	});
	
})
