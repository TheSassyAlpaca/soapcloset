function openCart() {
	//do onload of '/shopping_tub'
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
