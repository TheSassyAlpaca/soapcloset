modalStart=`<modal id="loginModal">
	<h1>Sign Up</h1>
	<span>To shop, review orders, build a monthly re-occurring delivery, store favorites, create a wishlist, review products, and subscribe to updates.</span>
	<div class="login-box">`;

modalEnd=`</div>
	<div>
		<a href="/legal/privacy%20policy.html">Privacy Policy</a>
		<a href="/legal/terms%20of%20service.html">Terms of Service</a>
	</div>
	<span class="finePrint">Copyright © 2019-2020 The Sassy Alpaca, LLC. All Rights Reserved</span>
</modal>`;

function openLoginModal() {
	modalMid='';
	FB.getLoginStatus(function(response) {
		if(response.status==='connected') {
			modalMid=`<div class="fb-login-button" data-width="260px" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" scope="public_profile,email" onlogin="checkLoginState(),closeModal();"></div>`;
			modal=modalStart+modalMid+modalEnd;
			$('body').append('<div id="modalShield">'+modal+'</div>');
		} else {
			modalMid='';
			//login_with
			modal=modalStart+modalMid+modalEnd;
			$('body').append('<div id="modalShield">'+modal+'</div>');
			$('.fb-login-button.fb_iframe_widget.fb_iframe_widget_fluid').appendTo($('.login-box'));
		}
	});
	
	$('.login-box, #modalShield').click(function() {
		closeModal();
	})
}

function closeModal() {
	$('#modalShield').remove();
}
