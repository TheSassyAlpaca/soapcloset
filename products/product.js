tempFolder="";
safe=5;
p={};
buyMax="off";

$(function() {
	getProduct();
})

function getProduct() {
	getP=window.location.href.substring(44,window.location.href.lastIndexOf("/"));
	console.log(getP);
	getURLParts=window.location.href.split("/");
	c='';
	u='';
	n='';
	for(g=0;g<getURLParts.length;g++) {
		if(getURLParts[g]=="products") {
			c=getURLParts[g+1];
			u=getURLParts[g+2];
			n=getURLParts[g+3];
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
					if(product.category.replace(/[\s&'!-#()]/g,'').toLowerCase()==c&&product.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()==u&&product.name.replace(/[\s&'!-#()]/g,'').toLowerCase()==n) {
						p=product;
					}
				});
				console.log(p);
				window['ingredientList']=[];
				getIngredients();
				if($('#title').length<1) {
					$('#content').append('<div id="title"><h1>'+p.name+'</h1><span>'+listKeywords(p.keywords)+'</span></div>');
				}
				if($('#slideshow').length<1) {
					$('#content').append('<div id="slideshow"><div id="shareTool"></div><div id="favTool"><div id="favIt" style="background-size: 114%;background-position: -2px -7px;"><img src="/images/favStar.png"></div><div id="wishIt" style="background-size: 100%;background-position: 1px 0px;"><img src="/images/favHeart.png" style="height: 126%;width: 126%;margin-top: -9%;margin-right: -13%;margin-bottom: -17%;margin-left: -13%;"></div></div><div id="slideHolder" style="background-image:url('+p.images[0]+')"></div></div>');
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
					$('#favIt, #wishIt').click(function() {
						console.log('Clicked fav tool');
						console.log($(this).attr('id'));
						thisClass=$(this).attr('id');
						if($(this).hasClass(thisClass)) {
							$(this).removeClass(thisClass);
							//remove like
						} else {
							$(this).addClass(thisClass);
							//add like
							//userID+"|"+product
						}
						p=$(this).attr('data-value');
						c=$(this).attr('class');
						f="";//form - full url including first entry
						q=[];//array of subsequent queries sans '='
						a=[p,c];//list of query responses
						console.log(p);
						console.log(c);
						//submitForm(f,q,a);
						sendEvent('User',p,a.join(","));
						userAlert('This feature is not yet implemented. :(');
					})
				}
				if(cartName!=='cart') {
					userID=cartName.substring(4);
					console.log(userID);
					extra="/products/";
					start=extra.length;
					productName=window.location.pathname.substring(start);
					console.log(productName);
					$('#favIt,#wishIt').attr('data-value',userID+"|"+productName);
					//fetch fav list using userID + "|" + p
					
				}
				if($('#slideThumb').length<1) {
					$('#slideshow').append('<div id="slideThumb">'+slides(p.images)+'</div>');
					$('.slide').click(function() {
						$('#slideHolder').css('background-image',$(this).css('background-image'));
					})
				}
				if($('#pricing').length<1) {
					$('#content').append('<div id="pricing"><div class="priceBox"><div>$'+p.price+'</div><div><div>'+p.unit+'</div><div class="bulk">'+p.bulk.join(', ')+'</div></div></div></div>');
				}
				//Redo
				//$('#content').append(checkInventory(p.qty,p.name));
				if($('#description').length<1) {
					$('#content').append('<div id="description">'+p.description+'</div>');
				}
				if($('#ingredients').length<1) {
					$('#content').append('<div id="ingredients"><b>Ingredients:</b> '+ingredients(p.ingredients)+'</div>');
					$('.ingredient').on('hover click',function() {
						console.log($(this).attr('data-source'));
						for(i=0;i<ingredientList.length;i++) {
							if(ingredientList[i].name==$(this).attr('data-source')) {
								console.log(ingredientList[i].desc);
							}
						}
					})
				}
				$('#content').children('#options').remove();
				//THIS IS WHERE THE NEW SCENT OPTIONS NEED TO BE ENTERED
				console.log(p.options);
				$('#content').append('<div id="options"></div>');
				for(o=0;o<p.options.length;o++) {
					$('#options').append('<h2>'+p.options[o].option+'</h2><div class="optionsContainer">'+options(p.options[o])+'</div>');
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
						if(i.val()>=Number(i.attr('max'))&buyMax=="on") {
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
						changeCookie(cartName,id,a);
						userAlert(a+' '+p.name+' - '+$(this).parents('.buy').attr('data-source')+' are now in your cart.');
					})
					$('.buy input').each(function() {
						if($(this).val()!=0) {
							$(this).parent().parent().children('.addToCart').css('display','none');
						}
						if($(this).val()>=Number($(this).attr('max'))&buyMax=="on") {
							$(this).parent().find('input').next().addClass('greyedOut');
						}
					})
				}
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
		console.log(id);
		for(j=0;j<cooks.length;j++) {
			cookie=cooks[j].split('=');
			if(cookie[0]==cartName) {
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
		if(cookie[0]==cartName) {
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
		slides='';
		for(i=0;i<s.length;i++) {
			slides=slides+'<div class="slide" style="background-image:url(https://www.thesassyalpaca.com'+s[i]+')"></div>';
		}
		slides=slides+'';
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
