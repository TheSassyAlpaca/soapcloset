$(function() {
	getProduct();
})

function getProduct() {
	getP=window.location.href.substring(47,window.location.href.lastIndexOf("/"));
	product={};
	p=product;
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					if(product.name.replace(/[\s&'!-#()]/g,'').toLowerCase()==getP) {
						p=product;
					}
				});
				window['ingredientList']=[];
				getIngredients();
				//title
				//keywords
				$('#content').append('<div id="title"><h1>'+p.name+'</h1><span>'+listKeywords(p.keywords)+'</span></div>');
				//image slides
					//image thumbs
					//slide mechanics
				$('#content').append('<div id="slideshow"><div id="slideHolder" style="background-image:url('+p.images[0]+')"></div></div>');
				$('#slideshow').append('<div id="slideThumb">'+slides(p.images)+'</div>');
				//price
					//bulk rates
				$('#content').append('<div id="pricing"><div class="priceBox"><div>$'+p.price+'</div><div><div>'+p.unit+'</div><div class="bulk">'+p.bulk.join(', ')+'</div></div></div><div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+getValue(p)+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div>');
				//description
				$('#content').append('<div id="description">'+p.description+'</div>');
				//ingredients
				$('#content').append('<div id="ingredients"><b>Ingredients:</b> '+ingredients(p.ingredients)+'</div>');
				//functions
				//slideshow
				$('.slide').click(function() {
					$('#slideHolder').css('background-image',$(this).css('background-image'));
				})
				//ingredients tooltip
				$('.ingredient').on('hover click',function() {
					console.log($(this).attr('data-source'));
					for(i=0;i<ingredientList.length;i++) {
						if(ingredientList[i].name==$(this).attr('data-source')) {
							console.log(ingredientList[i].desc);
						}
					}
				})
				$('.buy button').click(function(e) {
					e.stopPropagation();
					//p=products[$(this).parents('.listing').attr('data')];
					a=0;
					i=$(this).parent().find('input');
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
					if(i.val()>i.attr('max')) {
						i.val(i.attr('max'));
						a=i.val();
					}
					if(i.val()!=0) {
						$(this).parents('.buy').find('.addToCart').css('display','none');
					} else {
						$(this).parents('.buy').find('.addToCart').css('display','block');
					}
					changeCookie('cart',p.name.replace(/[\s&'!-#()]/g,'').toLowerCase(),a);
					userAlert(a+' '+p.name+' are now in your cart.');
				})
				$('.buy input').each(function() {
					if($(this).val()!=0) {
						$(this).parent().parent().children('.addToCart').css('display','none');
					}
				})
			})
		});
	});
}

function changeCookie(c,p,a) {
	console.log(c,p,a);
	console.log(document.cookie);
	c=document.cookie;
	cooks=c.split('; ');
	cart={};
	name=p;
	found=0;
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
		}
	}
	cart[name]=a;
	document.cookie='cart='+JSON.stringify(cart)+';path: /;domain=.thesassyalpaca.com';
}

function getValue(p) {
	//check cookies for this product using p.name.replace(/[\s&'!-#()]/g,'')
	c=document.cookie;
	cooks=c.split('; ');
	q=0;
	cart={};
	name=p.name.replace(/[\s&'!-#()]/g,'').toLowerCase();
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
			if(name in cart) {
				q=cart[name];
			}
		}
	}
	if(p.qty<q) {
		q=p.qty;
	}
	return q
}

function ingredients(ing) {
	ingredients='';
	for(i=0;i<ing.length;i++) {
		ingredients=ingredients+'<div class="ingredient" data-source="'+ing[i]+'">'+ing[i]+'</div>';
		if(i<ing.length-1) {
			ingredients=ingredients+', ';
		}
	}
	return ingredients
}

function slides(s) {
	slides='';
	for(i=0;i<s.length;i++) {
		slides=slides+'<div class="slide" style="background-image:url(https://soapcloset.thesassyalpaca.com'+s[i]+')"></div>';
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
