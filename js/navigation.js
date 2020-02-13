$(function() {
	downloadProducts();
})

function downloadProducts() {
	window['products']=[]
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
						$('#content').append('<div id="'+p.category.replace(/[\s&]/,'')+'" class="category"><h1>'+p.category+'</h1></div>');
					}
					//if($('#'+p.category.replace(/[\s&]/,'')).children($('#'+p.subcategory.replace(/[\s&]/,''))).length==0) {
					//	$('#'+p.category.replace(/[\s&]/,'')).append('<div id="'+p.subcategory.replace(/[\s&]/,'')+'" class="subcategory"><h2>'+p.subcategory+'</h2></div>');
					//}
					$('#'+p.category.replace(/[\s&]/,'')).children($('#'+p.subcategory.replace(/[\s&]/,''))).append(listing(p));
				});
				//
				$('.category').children('h1').click(function() {
					$('.category').removeClass('expand');
					$(this).parent().toggleClass('expand');
				})
				$('.subcategory').children('h2').click(function() {
					$('.category').removeClass('expand');
					$('.subcategory').removeClass('expand');
					$(this).parents('.category').addClass('expand');
					$(this).parent().toggleClass('expand');
				})
				$('.listing').click(function() {
					$('.listing').removeClass('expand');
					$(this).toggleClass('expand');
				})
			});
		});
	})
}

function listing(p) {
	l='<div id="'+p.name.replace(/[\s&]/,'').toLowerCase()+'" class="listing"><div class="listingLeft"><img src="'+p.images[0]+'"></div><div class="listingMid"><h3>'+p.name+'</h3><span class="keywords">'+p.keywords.join(", ")+'</span><br><span class="description">'+p.description+'</span></div><div class="listingRight"><span>$'+p.price+'</span>'+bulkRates(p)+'</div></div><hr>' 
	return l
}

function bulkRates(p) {
	b='';
	if('bulk' in p && p.bulk!==[]) {
		b='<div class="bulkRates"><span>Bulk Prices</span><div><span>'+p.bulk.join('</span><br><span>')+'</span></div></div>';
	}
	return b
}
