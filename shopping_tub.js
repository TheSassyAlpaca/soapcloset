$(function() {
	openCart();
})

function openCart() {
	//do onload of '/shopping_tub'
	cList=document.cookie.split("; ");
	c='product';
	value='';
	console.log(cList);
	for(i=0;i<cList.length;i++) {
		if(cList[i].substring(0,c.length)==c) {
			cPair=cList[i].split("=");
			value=cPair[1];
			console.log(cPair);
		}
	}
	if(value!=null||value!='undefined') {
		vList=value.split(",");
		//counter=0;
		pList=[];
		for(i=0;i<vList.length;i++) {
			vSet=vList[i].split('+');
			if(vSet[1]>0) {
				//counter++;
				pList.push('{"product":"'+vSet[0]+'","qty":"'+vSet[1]+'"}');
			}
		}
		if(counter>0) {
			//Looks like there are some items in the cart, lets do something with that...
			console.log(pList);
		} else {
			//Nothing in your cart. Don't feel bad, we've all been there...
		}
	} else {
		//Nothing in your cart. Don't feel bad, we've all been there...
	}
}

function updateCart() {
	//do on update of cookie -> 'product'
	cList=document.cookie.split("; ");
	c='product';
	value='';
	console.log(cList);
	for(i=0;i<cList.length;i++) {
		if(cList[i].substring(0,c.length)==c) {
			cPair=cList[i].split("=");
			value=cPair[1];
			console.log(cPair);
		}
	}
	if(value!=null||value!='undefined') {
		vList=value.split(",");
		counter=0;
		for(i=0;i<vList.length;i++) {
			vSet=vList[i].split('+');
			if(vSet[1]>0) {
				counter++;
			}
		}
		if(counter>0) {
			tellCart(counter);
		} else {
			tellCart(0);
		}
	} else {
		tellCart(0);
	}
}

function tellCart(x) {
	$('#userCart').attr('data-content',x);
}
