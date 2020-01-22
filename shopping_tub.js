$(function() {
	if(location.href=='https://soapcloset.thesassyalpaca.com/shopping_tub') {
		openCart();
	}
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
		pNames=[];
		pVars=[];
		for(i=0;i<vList.length;i++) {
			vSet=vList[i].split('+');
			if(vSet[1]>0) {
				//counter++;
				console.log(vSet[0],vSet[0].indexOf("_"));
				
				/*
				vars=vSet[0].substring(vSet[0].indexOf("_"),vSet[0].length);
				varsList=vars.split('|');
				for(i=0;i<varsList.length;i++) {
					varName=varsList[i].split("-");
					if(pVars.indexOf(varName[0])!=-1) {
						pVars.push(varName[0]);
					}
				}
				*/
				//,"vars":"'+varsList+'"
				pList.push(JSON.parse('{"product":"'+vSet[0]+'","qty":"'+vSet[1]+'"}'));
				checkCase=vSet[0].substring(0,1);
				if(checkCase==checkCase.toLowerCase()) {
					pNames.push(vSet[0].substring(0,vSet[0].indexOf("_")));
				} else {
					pNames.push(vSet[0]);
				}
			}
		}
		if(counter>0) {
			//Looks like there are some items in the cart, lets do something with that...
			console.log(pList);
			buildCart(pNames,pList);
		} else {
			//Nothing in your cart. Don't feel bad, we've all been there...
		}
	} else {
		//Nothing in your cart. Don't feel bad, we've all been there...
	}
}

function buildCart(x,y) {
	console.log(x,y);
	products=[];
	pVars=[];
	variableList=[];
	pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				if(x.indexOf(entry.gsx$proname.$t)!=-1) {
					products.push(entry);
					if(entry.gsx$var.$t!='NA') {
						thisVars=entry.gsx$var.$t.split(",");
						for(j=0;j<thisVars.length;j++) {
							if(pVars.indexOf(thisVars[j])==-1) {
								pVars.push(thisVars[j]);
							}
						}
						
					}
				}
			});
			console.log(pVars);
			$(function() {
				$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/2/public/values?alt=json-in-script&callback=?",
				function (data) {
					$.each(data.feed.entry, function(i,entry) {
						if(pVars.indexOf(entry.gsx$var.$t)!=-1) {
							variableList.push(entry);
						}
					});
					//
					console.log(products);
					console.log(variableList);
					showCart(x,y);
				});
			});
		});
	});
}

function showCart(x,y) {
	$('#content').append('<div id="cart"></div>');
	for(i=0;i<y.length;i++) {
		for(j=0;j<products.length;j++) {
			if(products[j].gsx$proname.$t==x[i]) {
				console.log(products[j].gsx$productname.$t);
				vList=[];
				vTraits='';
				if(x[i].length==y[i].product.length) {
					vTraits=products[j].gsx$traits.$t;
				} else {
					vS=y[i].product.substring(y[i].product.indexOf('_')+1,y[i].product.length);
					console.log(vS);
				}
				$('#cart').append('<div id="'+y[i].product.replace(/[|]+/g,'')+'" class="product"><img src="https://soapcloset.thesassyalpaca.com/images/products/'+products[j].gsx$photos.$t.substring(0,products[j].gsx$photos.$t.indexOf(','))+'"><div class="dataSource" data-price="'+products[j].gsx$price.$t.substring(0,endString(products[j].gsx$price.$t,','))+'" data-content="'+y[i].qty*products[j].gsx$price.$t.substring(0,endString(products[j].gsx$price.$t,','))+'"><h3>'+products[j].gsx$productname.$t+'</h3><span>'+vTraits+'</span></div><div id="'+y[i].product.replace(/[|]+/g,'')+'counter" class="counter"><div class="down">-</div><input type="number" value="'+y[i].qty+'" min="0"><div class="up">+</div></div></div>');
				thisProduct=$('#'+y[i].product.replace(/[|]+/g,'')+'counter');
				theProduct=y[i].product;
				thisProduct.children('div').click(function() {
					if($(this).hasClass('down')) {
						if($(this).parent().children('input').val()>0) {
							$(this).parent().children('input').val(Number($(this).parent().children('input').val())-1);
						}
					}
					if($(this).hasClass('up')) {
						$(this).parent().children('input').val(Number($(this).parent().children('input').val())+1);
					}
					updateCartItem(theProduct,thisProduct.children('input').val());
				})
				
			}
		}
	}
	
}

function updateCartItem(x,y) {
	//updateCookie('product','Replace',x+'+'+y,2592000000);
	console.log('product','Replace',x+'+'+y,2592000000);
	//$('#'+x.replace(/[|]+/g,'')+'counter').children('input').val(y);
	$('#'+x.replace(/[|]+/g,'')).children('div.dataSource').attr('data-content',$('#'+x.replace(/[|]+/g,'')).children('div.dataSource').attr('data-price')*y);
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
