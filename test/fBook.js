function buildFacebook() {
	$('#bltBody').children('.bltMenu').prepend('<div id="userBox"><img src=""><span></span></div>');
	$('#bltBody').children('.bltMenu').append('<button style="display:none;" onclick="logIntoFacebook();">Log In?</button>');
	$('#bltBody').children('.bltMenu').append('<button style="display:none;" onclick="logOutOfFacebook();">Log Out?</button>');

	//add to css
	thisCSS=`<style>
	#userBox {
		
	}
	#userBox img {
		
	}
	#userBox span {
		
	}
	</style>`
	$('body').append(thisCSS);
}
