function buildFacebook() {
	$('#bltBody').children('.bltMenu').prepend('<div id="userBox"><img src=""><span></span></div>');
	$('#bltBody').children('.bltMenu').append('<button id="fBLI" style="display:none;" onclick="logIntoFacebook();">Log In?</button>');
	$('#bltBody').children('.bltMenu').append('<button id="fBLO" style="display:none;" onclick="logOutOfFacebook();">Log Out?</button>');

	//add to css
	thisCSS=`<style>
	#userBox {
		
	}
	#userBox img {
		vertical-align: top;
		border-radius: 50%;
		height: 40px;
		border: 5px solid rgba(var(--ocean),.6);
		box-shadow: 0px 0px 10px 0px rgba(var(--oats),.3);
	}
	#userBox img + span {
		vertical-align: top;
		line-height: 25px;
		display: inline-block;
		text-indent: 0px;
		padding-left: 10px;
		font-size: 20px;
	}
	#userBox span > span {
		font-size: 150%;
	}
	#fBLI, #fBLO {
		height: calc(var(--thumb) * .5);
		width: calc(100% - 20px);
		font-family: var(--econ);
		padding: 3px;
		vertical-align: top;
		font-size: 20px;
		position: absolute;
		bottom: 0px;
		left: 10px;
	}
	
	
	.bltMenu {
		position: relative;
	}
	</style>`
	$('body').append(thisCSS);
}
