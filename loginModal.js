modal=`<modal id="loginModal">
	<h1>Sign Up</h1>
	<span>To shop, review orders, build a monthly re-occurring delivery, store favorites, create a wishlist, review products, and subscribe to updates.</span>
	<div class="login-box"></div>
	<div>
		<a href="/legal/privacy%20policy.html">Privacy Policy</a>
		<a href="/legal/terms%20of%20service.html">Terms of Service</a>
	</div>
	<span class="finePrint">Copyright © 2019-2020 The Sassy Alpaca, LLC. All Rights Reserved</span>
</modal>`;

function openLoginModal() {
	FB.getLoginStatus(function(response) {
		$('body').append('<div id="modalShield">'+modal+'</div>');
		$('.fb-login-button').appendTo($('.login-box'));
	});
	
	$('.login-box, #modalShield').click(function() {
		//$('.fb-login-button.fb_iframe_widget.fb_iframe_widget_fluid').appendTo($('#attic'));
		closeModal();
	})
}

function closeModal() {
	$('#modalShield').remove();
}
