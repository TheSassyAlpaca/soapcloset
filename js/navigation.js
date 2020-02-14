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
					console.log(p);
					console.log(p.name);
					console.log(p.keywords);
					if($('#'+p.category.replace(/[\s&]/,'')).length==0) {
						$('#content').append('<div id="'+p.category.replace(/[\s&]/,'')+'" class="category"><div class="catHeader" style="background-image:url('+p.images[0]+')"><h1>'+p.category+'</h1><div class="photoBox"></div></div></div>');
					}
					if($('#'+p.category.replace(/[\s&]/,'')).children('#'+p.subcategory.replace(/[\s&]/,'')).length==0) {
						$('#'+p.category.replace(/[\s&]/,'')).append('<div id="'+p.subcategory.replace(/[\s&]/,'')+'" class="subcategory"><h2>'+p.subcategory+'</h2></div>');
					}
					$('#'+p.category.replace(/[\s&]/,'')).children('#'+p.subcategory.replace(/[\s&]/,'')).append(listing(p));
				});
				//
				$('.category').children('.catHeader').click(function() {
					if($(this).parent().hasClass('expand')) {
						$('.category').removeClass('expand');
						$(this).parent().removeClass('expand');
					} else {
						$('.category').removeClass('expand');
						$(this).parent().addClass('expand');
					}
				})
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
				$('.bulkRates').click(function(e) {
					e.stopPropagation();
					if($(this).children('div').hasClass('expand')) {
						$('.bulkRates').children('div').removeClass('expand');
						$(this).children('div').removeClass('expand');
					} else {
						$('.bulkRates').children('div').removeClass('expand');
						$(this).children('div').addClass('expand');
					}
				})
				$('.listing button').click(function(e) {
					e.stopPropagation();
					p=JSON.parse($(this).parents('.listing').attr('data'));
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
						a=1;
					}
					console.log(a);
					changeCookie(p.name.replace(/[\s&]/,'').toLowerCase(),a);
				})
			});
		});
	})
}

function listing(p) {
	l='<div id="'+p.name.replace(/[\s&]/,'').toLowerCase()+'" class="listing" data="'+p+'"><div class="listingLeft"><img src="'+p.images[0]+'"></div><div class="listingMid"><h3>'+p.name+'</h3><span class="keywords">'+p.keywords.join(", ")+'</span><br><span class="description">'+p.description+'</span></div><div class="listingRight"><span>$'+p.price+'</span>'+bulkRates(p)+'<div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#11206;</button><input type="text" value="'+getValue(p)+'" min=0 max='+p.qty+'><button>&#11205;</button></div></div></div></div><hr>' 
	return l
}

function bulkRates(p) {
	b='';
	if('bulk' in p && p.bulk!==[]) {
		b='<div class="bulkRates"><span>Bulk Prices</span><div><span>'+p.bulk.join('</span><br><span>')+'</span></div></div>';
	}
	return b
}

function getValue(p) {
	//check cookies for this product using p.name.replace(/[\s&]/,'')
	//check for availability through p.qty
	//default = 1
	i=1;
	return i
}

function changeCookie(p,a) {
	console.log("QTY "+a);
}
