function buildFacebook() {
	$('#bltBody').children('.bltMenu').prepend('<div id="userBox"><img src=""><span></span></div>');
	$('#bltBody').children('.bltMenu').append('<button style="display:none;" onclick="logIntoFacebook();">Log In?</button>');
	$('#bltBody').children('.bltMenu').append('<button style="display:none;" onclick="logOutOfFacebook();">Log Out?</button>');

	//add to css
	thisCSS=`<style>
	#userBox {
		
	}
	#userBox img {
		vertical-align: top;
		border-radius: 50%;
		border: 5px solid rgba(var(--ocean),.6);
		box-shadow: 0px 0px 10px 0px rgba(var(--oats),.3);
	}
	#userBox span {
		vertical-align: top;
		line-height: 25px;
		display: inline-block;
	}
	</style>`
	$('body').append(thisCSS);
}
