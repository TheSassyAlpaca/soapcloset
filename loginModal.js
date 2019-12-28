modal=`
<modal id="loginModal">
	<h1>Sign Up</h1>
	<span>To shop, review orders, build a monthly re-occurring delivery, store favorites, create a wishlist, review products, and subscribe to updates.</span>
	<div class="login-box">
		<div class="fb-login-button" data-width="260px" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" onlogin="checkLoginState();"></div>
		<div class="fb-login-button" data-width="260px" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true" data-onlogin="closeModal()" onlogin="checkLoginState();"></div>
	</div>
	<div>
		<a href="/legal/privacy%20policy.html">Privacy Policy</a>
		<a href="/legal/terms%20of%20service.html">Terms of Service</a>
	</div>
	<span class="finePrint">Copyright © 2019-2020 The Sassy Alpaca, LLC. All Rights Reserved</span>
</modal>`

$(function() {
	$('body').append('<div id="modalShield">'+modal+'</div>');
	$('.login-box, #modalShield').click(function() {
		closeModal();
	})
})

function closeModal() {
	$('#modalShield').remove();
}
