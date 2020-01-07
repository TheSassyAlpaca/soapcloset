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
		pNames=[];
		pVars=[];
		for(i=0;i<vList.length;i++) {
			vSet=vList[i].split('+');
			if(vSet[1]>0) {
				//counter++;
				console.log(vSet[0],vSet[0].indexOf("_"));
				pNames.push(vSet[0].substring(0,vSet[0].indexOf("_")));
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
	variables=[];
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
							variables.push(entry);
						}
					});
					//dataPulls("getSongs");
					
					console.log(products);
					console.log(variables);
				});
			});
		});
	});
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
