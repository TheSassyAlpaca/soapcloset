$(function() {
	getProduct();
})

function getProduct() {
	getP=window.location.href.substring(40,window.location.href.lastIndexOf("/"));
	product={};
	p=product;
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					if(product.id.replace(/[\s&'!-#()]/g,'').toLowerCase()==getP) {
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
				$('#content').append('<div id="slideshow"><div id="shareTool">'+shareTool($(location).attr('href'))+'</div><div id="slideHolder" style="background-image:url('+p.images[0]+')"></div></div>');
				$('#slideshow').append('<div id="slideThumb">'+slides(p.images)+'</div>');
				//price
					//bulk rates
				$('#content').append('<div id="pricing"><div class="priceBox"><div>$'+p.price+'</div><div><div>'+p.unit+'</div><div class="bulk">'+p.bulk.join(', ')+'</div></div></div><div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+getValue(p)+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div>');
				//description
				$('#content').append(checkInventory(p.qty,p.name));
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
					changeCookie('cart',p.id.replace(/[\s&'!-#()]/g,'').toLowerCase(),a);
					userAlert(a+' '+p.name+' are now in your cart.');
				})
				$('.buy input').each(function() {
					if($(this).val()!=0) {
						$(this).parent().parent().children('.addToCart').css('display','none');
					}
					if($(this).val()>=Number($(this).attr('max'))) {
						$(this).parent().find('input').next().addClass('greyedOut');
					}
				})
				$('#shareTool').click(function() {
					console.log('clicky');
					socialMediaShares=[
						{icon:'facebook.png',href:'https://www.facebook.com/sharer/sharer.php?u='+$(location).attr("href")},
						{icon:'twitter.png',href:'https://twitter.com/intent/tweet?text='+$(location).attr("href")},
						{icon:'linkedin.png',href:'https://www.linkedin.com/shareArticle?mini=true&url='+$(location).attr("href")+'&title='+$("meta[property='og:title']").attr("content")+'&summary='+$("meta[property='og:description']").attr("content")+'&source=The Sassy Alpaca'},
						{icon:'pinterest.png',href:'https://pinterest.com/pin/create/button/?url='+$(location).attr("href")+'&media='+$("meta[property='og:image']").attr("content")+'&description='+$("meta[property='og:description']").attr("content")}
					];
				
					$('body').append('<div id="shareModul"><div id="shareContainer"></div></div>');
					for(s=0;s<socialMediaShares.length;s++) {
						$('#shareContainer').append('<a href="'+socialMediaShares.href+'" target="_blank"><div style="background-image: url('+socialMediaShares.icon+')"></div></a>');
					}
					$('#shareModul').click(function() {
						$('#shareModul').remove();
					})
				})
			})
		});
	});
}

function shareTool(x) {
	console.log(x);
	//expand share options
	/*	position: fixed;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.8); 
	*/
	
	//facebook="https://www.facebook.com/sharer/sharer.php?u="
		//$(location).attr('href')
	//twitter="https://twitter.com/intent/tweet?text="
		//$(location).attr('href')
	//pinterest="https://pinterest.com/pin/create/button/?url="
			//$(location).attr('href')
		//&media=
			//$("meta[property='og:image']").attr("content");
		//&description=
			//$("meta[property='og:description']").attr("content");
	//linkedin="https://www.linkedin.com/shareArticle?mini=true"
		//&url=
			//$(location).attr('href')
		//&title=$("meta[property='og:title']").attr("content");
			//$(document).attr('title');
		//&summary=
			//$("meta[property='og:description']").attr("content");
		//&source=
			//The Sassy Alpaca
	//'https://www.linkedin.com/shareArticle?mini=true&url='+$(location).attr('href')+'&title=$("meta[property='og:title']").attr("content")+'&summary='+$("meta[property='og:description']").attr("content")+'&source=The Sassy Alpaca'
	share="";
	return share
}

function checkInventory(i,n) {
	alert='';
	safe=5;
	if(i<=safe) {
		alert='<span style="color: red">'+i+' '+n+' remaining.</span><br>';
	}
	return alert
}

function ingredients(ing) {
	//break ing into array ings
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
