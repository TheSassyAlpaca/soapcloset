cartName='cart';
//update in productNEW.js
//update in tubNEW.js
//update cart={}; with window[cart]={};
/*
	if(cookie[0]=='cart') {
		cart=JSON.parse(cookie[1]);
		for(k in cart) {
			console.log(cart[k]);
			q=q+Number(cart[k]);
		}
	}
	//should become
	if(cookie[0]==window[cart]) {
		window[cart]=JSON.parse(cookie[1]);
		for(k in cart) {
			console.log(window[cart][k]);
			q=q+Number(window[cart][k]);
		}
	}
*/

function checkCart(id) {
	//get cookies and see if 'cart + id' exists.
		//if yes, update cart to that cart
		//if no, save current cart to that cart name - update cart variable
	c=document.cookie;
	cooks=c.split('; ');
	genCart='';
	userCart='';
	for(i=0;i<cooks.length;i++) {
		cSplit=cooks[i].split("=");
		if(cSplit[0]=='cart') {
			genCart=cSplit[1];
			console.log(genCart);
		}
		if(cSplit[0]=='cart'+id) {
			userCart=cSplit[1];
			console.log(userCart);
		}
		//cooks[i]=cSplit[0]+'":"'+cSplit.splice(1);
	}
	cartName='cart'+id;
	if(userCart==''&&genCart!='') {
		userCart=genCart;
		//do thing that sets cart as cookie.
		document.cookie=cartName+"="+userCart;
	}
	
	/*
	cooked=cooks.join('","');
	c1=cooked.split('"{');
	cooked=c1.join('{');
	c2=cooked.split('}"');
	cooked=c2.join('}');
	console.log(cooked);
	cookies=JSON.parse('{"'+cooked+'"}');
	console.log(cookies);//check
	console.log(cookies.cart);//check
	console.log(cookies['cart'+id]);//check - undefined
	
	if(cookies['cart'+id]===undefined) {
		//or equals something that is non-sense
		console.log(cart);
		if(cart=='cart'&&cookies.cart!==undefined) {
			cart='cart'+id;
			//oldCart=cookies.cart;
			//oldCart=oldCart.split(/[\{\}]+/);
			console.log(oldCart);
			window[cart]=oldCart;
			console.log(cart);
			console.log(window[cart]);
		}
	}
	*/
}

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
	.subscribe input {
		font-size: 110%;
	}
	</style>`
	$('body').append(thisCSS);
}
