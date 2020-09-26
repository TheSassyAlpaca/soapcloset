function buildFacebook() {
	$('#bltBody').children('.bltMenu').append('<button style="display:none;" onclick="logIntoFacebook();">Log In?</button>');
	$('#bltBody').children('.bltMenu').append('<button style="display:none;" onclick="logOutOfFacebook();">Log Out?</button>');
}
