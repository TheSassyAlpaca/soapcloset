tempFolder="/test";
safe=5;
p={};

$(function() {
	getProduct();
})

function getProduct() {
	getP=window.location.href.substring(44,window.location.href.lastIndexOf("/"));
	console.log(getP);
	getURLParts=window.location.href.split("/");
	c=''
	n=''
	for(g=0;g<getURLParts.length;g++) {
		if(getURLParts[g]=="products") {
			c=getURLParts[g+1];
			n=getURLParts[g+2];
		}
	}
	console.log(c,n);
	product={};
	p=product;
	$(function() {
		pKey="1Z14hYfA6TiRhZ1zwZ3vehgOwQ2pfDL4A5wn1PPVFmhE";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					/*
					if(product.id.replace(/[\s&'!-#()]/g,'').toLowerCase()==getP) {
						p=product;
					}
					*/
					if(product.category.replace(/[\s&'!-#()]/g,'').toLowerCase()==c&&product.name.replace(/[\s&'!-#()]/g,'').toLowerCase()==n) {
						p=product;
					}
				});
				console.log(p);
				window['ingredientList']=[];
				getIngredients();
				$('#content').append('<div id="title"><h1>'+p.name+'</h1><span>'+listKeywords(p.keywords)+'</span></div>');
				$('#content').append('<div id="slideshow"><div id="shareTool"></div><div id="slideHolder" style="background-image:url('+p.images[0]+')"></div></div>');
				$('#slideshow').append('<div id="slideThumb">'+slides(p.images)+'</div>');
				$('#content').append('<div id="pricing"><div class="priceBox"><div>$'+p.price+'</div><div><div>'+p.unit+'</div><div class="bulk">'+p.bulk.join(', ')+'</div></div></div></div>');
				//Redo
				//$('#content').append(checkInventory(p.qty,p.name));
				$('#content').append('<div id="description">'+p.description+'</div>');
				$('#content').append('<div id="ingredients"><b>Ingredients:</b> '+ingredients(p.ingredients)+'</div>');
				//THIS IS WHERE THE NEW SCENT OPTIONS NEED TO BE ENTERED
				console.log(p.options);
				$('#content').append('<div id="options"></div>');
				for(o=0;o<p.options.length;o++) {
					$('#options').append('<h2>'+p.options[o].option+'</h2><div class="optionsContainer">'+options(p.options[o])+'</div>');
				}
				$('.slide').click(function() {
					$('#slideHolder').css('background-image',$(this).css('background-image'));
				})
				$('.ingredient').on('hover click',function() {
					console.log($(this).attr('data-source'));
					for(i=0;i<ingredientList.length;i++) {
						if(ingredientList[i].name==$(this).attr('data-source')) {
							console.log(ingredientList[i].desc);
						}
					}
				})
				
				
				
				
				
				$('.buy button').click(function(e) {
					//e.stopPropagation();
					a=0;
					i=$(this).parent().find('input');
					$(this).parent().find('input').next().removeClass('greyedOut');
					if(!$(this).hasClass('addToCart')) {
						if($(this).hasClass('down')) {
							i.val(Number(Number(i.val())-1));
						} else {
							i.val(Number(Number(i.val())+1));
						}
						a=i.val();
					} else {
						i.val(1);
						a=1;
					}
					if(i.val()>=Number(i.attr('max'))) {
						i.val(Number(i.attr('max')));
						a=i.val();
						i.next().addClass('greyedOut');
					}
					if(i.val()!=0) {
						$(this).parents('.buy').find('.addToCart').css('display','none');
					} else {
						$(this).parents('.buy').find('.addToCart').css('display','block');
					}
					id=$(this).parents('.buy').attr('id');
					console.log($(this).parents('.buy').attr('id'));
					changeCookie('cart',id,a);
					userAlert(a+' '+p.name+' - '+$(this).parents('.buy').attr('data-source')+' are now in your cart.');
				})
				$('.buy input').each(function() {
					if($(this).val()!=0) {
						$(this).parent().parent().children('.addToCart').css('display','none');
					}
					if($(this).val()>=Number($(this).attr('max'))) {
						$(this).parent().find('input').next().addClass('greyedOut');
					}
				})
				//this should probably be moved to Navigation.js
				$('#shareTool').click(function() {
					console.log('clicky');
					//test and update the objects as needed...
					socialMediaShares=[
						{icon:'facebook.png',href:'https://www.facebook.com/sharer/sharer.php?u='+encodeURI($(location).attr("href"))},
						{icon:'twitter.png',href:'https://twitter.com/intent/tweet?text='+encodeURI($(location).attr("href"))},
						{icon:'linkedin.png',href:'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURI($(location).attr("href"))+'&title='+encodeURI(p.name)+'&summary='+encodeURI(p.description)+'&source=The Sassy Alpaca'},
						{icon:'pinterest.png',href:'https://pinterest.com/pin/create/button/?url='+encodeURI($(location).attr("href"))+'&media='+encodeURI($("meta[property='og:image']").attr("content"))+'&description='+encodeURI($("meta[property='og:description']").attr("content"))}
					];
					console.log(socialMediaShares);
					$('body').append('<div id="shareModul"><div id="shareContainer"></div></div>');
					for(s=0;s<socialMediaShares.length;s++) {
						$('#shareContainer').append('<a href="'+socialMediaShares[s].href+'" target="_blank"><div style="background-image: url(/images/'+socialMediaShares[s].icon+')"></div></a>');
					}
					$('#shareModul').click(function() {
						$('#shareModul').remove();
					})
				})
			})
		});
	});
}

function options(o) {
	console.log(o);
	opts='';
	for(i=0;i<o.options.length;i++) {
		console.log(o.options[i].qty);
		c=document.cookie;
		cooks=c.split('; ');
		v=0;
		cart={};
		id=p.category.replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+p.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+o.options[i].name.replace(/[\s&'!-#()]/g,'').toLowerCase();
		for(i=0;i<cooks.length;i++) {
			cookie=cooks[i].split('=');
			if(cookie[0]=='cart') {
				cart=JSON.parse(cookie[1]);
				if(id in cart) {
					v=cart[id];
				}
			}
		}
		if(Number(o.qty)<v) {
			v=Number(o.qty);
		}
		
		
		
		opt='<div class="option"><label>'+o.options[i].name+'</label><div id="'+p.category.replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+p.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+o.options[i].name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="buy" data-source="'+o.options[i].name+'"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" min=0 max='+o.options[i].qty+' value='+v+'><button>&#x25B2;</button></div></div></div>';
		console.log(opt);
		opts=opts+opt;
	}
	return opts
}

function getOptionValue(o) {
	//check cookies for this product using p.name.replace(/[\s&'!-#()]/g,'')
	c=document.cookie;
	cooks=c.split('; ');
	q=0;
	cart={};
	id=p.category.replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+p.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'|'+o.name.replace(/[\s&'!-#()]/g,'').toLowerCase();
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
			if(id in cart) {
				q=cart[id];
			}
		}
	}
	if(Number(o.qty)<q) {
		q=Number(o.qty);
	}
	console.log(o);
	console.log(q);
	return q
}

function checkInventory(i,n) {
	alert='';
	if(i<=safe) {
		alert='<span style="color: red">'+i+' '+n+' remaining.</span><br>';
	}
	return alert
}

function ingredients(ing) {
	//break ing into array ings
	ingredients='';
	for(i=0;i<ing.length;i++) {
		ingredients=ingredients+'<span class="ingredient" data-source="'+ing[i]+'">'+ing[i]+'</span>';
		if(i<ing.length-1) {
			ingredients=ingredients+', ';
		}
	}
	return ingredients
}

function slides(s) {
	slides='';
	if(s.length>1) {
		for(i=0;i<s.length;i++) {
			slides=slides+'<div class="slide" style="background-image:url(https://www.thesassyalpaca.com'+s[i]+')"></div>';
		}
	}
	return slides
}

function listKeywords(k) {
	keywords=k.join(', ');
	return keywords
}

function getIngredients() {
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/9/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					ingredientList.push(JSON.parse(entry.gsx$data.$t));
				});
			})
		});
	});
}
