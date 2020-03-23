$(function() {
	console.log(decodeURI($(location).attr('hash')));
	query=decodeURI($(location).attr('hash'));
	q=query.split(' ');
	getKeywords(q);
})

function getKeywords(q) {
	console.log(q);
	window[pros]=[];
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					pros.push(product);
					for(j=0;j<q.length;j++) {
						if(product.description.indexOf(q[j])!=-1||product.ingredients.indexOf(q[j])!=-1) {
							if($('#content').children($('#products')).length==-1) {
								$('#content').append('<div id="products" class="region"><h1>Products</h1></div>');
							}
							$('#products').append('<a href="/products/"'+product.id+'" target="_self">'+listing(product,i)+'</a>');
						}
					}
				});
				//run search for other items such as blogs and ingredients
				
			});
		});
	});	
}

function listing(p,i) {
	l='<div id="'+p.id.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+i+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3><span class="keywords">'+p.keywords.join(", ")+'</span><br><span class="description">'+p.description+'</span></div><div class="listingRight"><span>$'+p.price+'</span>'+bulkRates(p)+'<div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+getValue(p)+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div></div><hr>';
	return l
}
