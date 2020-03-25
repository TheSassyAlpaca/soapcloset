$(function() {
	downloadProducts();
})

function downloadProducts() {
	window['products']=[];
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					p=JSON.parse(entry.gsx$data.$t);
					products.push(p);
					if($('#'+p.category.replace(/[\s&'!-#()]/g,'')).length==0) {
						$('#content').append('<div id="'+p.category.replace(/[\s&'!-#()]/g,'')+'" class="category"><div class="catHeader" style="background-image:url('+p.images[0]+')"><h1>'+p.category+'</h1><hr><div class="photoBox"></div><hr></div></div>');
						$('#'+p.category.replace(/[\s&'!-#()]/g,'')).find('.photoBox').append('<div class="proPhoto"><img src="'+p.images[0]+'"></div>');
					}
					if($('#'+p.category.replace(/[\s&'!-#()]/g,'')).children('#'+p.subcategory.replace(/[\s&'!-#()]/g,'')).length==0) {
						$('#'+p.category.replace(/[\s&'!-#()]/g,'')).append('<div id="'+p.subcategory.replace(/[\s&'!-#()]/g,'')+'" class="subcategory"><h2>'+p.subcategory+'</h2></div>');
					}
					if($('#'+p.category.replace(/[\s&'!-#()]/g,'')).children('#'+p.subcategory.replace(/[\s&'!-#()]/g,'')).children('.'+p.lessercategory.replace(/[\s&'!-#()]/g,'')).length==0) {
						$('#'+p.category.replace(/[\s&'!-#()]/g,'')).children('#'+p.subcategory.replace(/[\s&'!-#()]/g,'')).append('<div class="'+p.lessercategory.replace(/[\s&'!-#()]/g,'')+' lessercategory expand"><h3>'+p.lessercategory+'</h3></div>');
					}
					photoCheck=0;
					$('#'+p.category.replace(/[\s&'!-#()]/g,'')).find('.photoBox').children('img').each(function() {
						if($(this).attr('src')==p.images[0]) {
							photoCheck++;
						}
					})
					if(photoCheck==0) {
						$('#'+p.category.replace(/[\s&'!-#()]/g,'')).find('.photoBox').append('<div class="proPhoto"><img src="'+p.images[0]+'"></div>');
					}
					$('#'+p.category.replace(/[\s&'!-#()]/g,'')).children('#'+p.subcategory.replace(/[\s&'!-#()]/g,'')).children('.'+p.lessercategory.replace(/[\s&'!-#()]/g,'')).append(listing(p,i));
				});
				//toggle categories
				$('.category').children('.catHeader').click(function() {
					if($(this).parent().hasClass('expand')) {
						$('.category').removeClass('expand');
						$(this).parent().removeClass('expand');
					} else {
						$('.category').removeClass('expand');
						$(this).parent().addClass('expand');
					}
				})
				//toggle sub-categories
				$('.subcategory').children('h2').click(function() {
					$('.category').removeClass('expand');
					$(this).parents('.category').addClass('expand');
					if($(this).parent().hasClass('expand')) {
						$('.subcategory').removeClass('expand');
						$(this).parent().removeClass('expand');
					} else {
						$('.subcategory').removeClass('expand');
						$(this).parent().addClass('expand');
					}
				})
				//toggle lesser-categories
				$('.lessercategory').children('h3').click(function() {
					$(this).parent().toggleClass('expand');
				})
				//expand/contract listing
				$('.listing').click(function() {
					if($(this).hasClass('expand')) {
						$('.listing').removeClass('expand');
						$(this).removeClass('expand');
						$(this).find('.bulkRates').children('div').removeClass('expand');
					} else {
						$('.listing').removeClass('expand');
						$(this).addClass('expand');
						$(this).find('.bulkRates').children('div').addClass('expand');
					}
				})
				//reveal/conceal bulkrates
				$('.bulkRates').click(function(e) {
					e.stopPropagation();
					if($(this).children('div').hasClass('expand')) {
						$('.bulkRates').children('div').removeClass('expand');
						$(this).children('div').removeClass('expand');
					} else {
						$('.bulkRates').children('div').removeClass('expand');
						$(this).children('div').addClass('expand');
					}
					sendEvent('User','Bulk Rates','Interest');
				})
				//add/remove/increment item to cart
				$('.listing button').click(function(e) {
					e.stopPropagation();
					p=products[$(this).parents('.listing').attr('data')];
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
					if(i.val()>Number(i.attr('max'))) {
						i.val(Number(i.attr('max')));
						a=i.val();
					}
					if(i.val()!=0) {
						$(this).parents('.buy').find('.addToCart').css('display','none');
					} else {
						$(this).parents('.buy').find('.addToCart').css('display','block');
					}
					changeCookie('cart',p.id.replace(/[\s&'!-#()]/g,'').toLowerCase(),a);
					userAlert(a+' '+p.name+' are now in your cart.');
				})
				//open page to product
				$('.listingLeft, .listingMid h3').click(function(e) {
					e.stopPropagation();
					p=products[$(this).parents('.listing').attr('data')];
					window.location.href="/products/"+p.id.replace(/[\s&'!-#()]/g,'').toLowerCase();
				})
				//show qty
				$('.buy input').each(function() {
					if($(this).val()!=0) {
						$(this).parent().parent().children('.addToCart').css('display','none');
					}
				})
				goToHash();
			});
		});
	})
}

function goToHash() {
	hash=$(location).attr('hash');
	$(hash).parents('.category, .subcategory, .lessercategory').addClass('expand');
	$(hash).addClass('expand');
	$([document.documentElement, document.body]).animate({
        scrollTop: $(hash).offset().top - 60
    }, 2000);
}

function listing(p,i) {
	l='<div id="'+p.id.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+i+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3><span class="keywords">'+p.keywords.join(", ")+'</span><br><span class="description">'+p.description+'</span></div><div class="listingRight"><span>$'+p.price+'</span>'+bulkRates(p)+'<div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+getValue(p)+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div></div><hr>';
	return l
}

function bulkRates(p) {
	b='';
	if('bulk' in p && p.bulk!==[]) {
		b='<div class="bulkRates"><span>Bulk Prices</span><div><span>'+p.bulk.join('</span><br><span>')+'</span></div></div>';
	}
	return b
}
