$(function() {
	console.log(decodeURI($(location).attr('hash')));
	query=decodeURI($(location).attr('hash'));
	ques=query.replace(/[#]/g,'');
	sendEvent('User','Search',query);
	q=ques.split(' ');
	$('#content').append('<div>'+decodeURI($(location).attr('hash'))+'</div>');
	$('#content').append('<div>'+q+'</div>');
	getKeywords(q);
})

function getKeywords(q) {
	console.log(q);
	window['pros']=[];
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					pros.push(product);
					if(i==0) {
						console.log(product);
					}
					for(j=0;j<q.length;j++) {
						pd=product.description.toLowerCase();
						pi=product.ingredients.join(' ');
						pi=pi.toLowerCase();
						if(pd.indexOf(q[j].toLowerCase())!=-1||pi.indexOf(q[j].toLowerCase())!=-1) {
							console.log(product);
							if(!$('#content #products').length) {
								$('#content').append('<div id="products" class="category"><h1>Products</h1></div>');
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
	l='<div id="'+p.id.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+i+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3><span class="keywords">'+p.keywords.join(", ")+'</span><br><span class="description">'+p.description+'</span></div><div class="listingRight"><span>$'+p.price+'</span><div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><button>&#x25B2;</button></div></div></div></div><hr>';
	return l
}
