$(function() {
	console.log(decodeURI($(location).attr('hash')));
	query=decodeURI($(location).attr('hash'));
	ques=query.replace(/[#]/g,'');
	sendEvent('User','Search',query);
	q=ques.split(' ');
	getKeywords(q);
})

function getKeywords(q) {
	console.log(q);
	window['pros']=[];
	$(function() {
		pKey="1Z14hYfA6TiRhZ1zwZ3vehgOwQ2pfDL4A5wn1PPVFmhE";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					pros.push(product);
					for(j=0;j<q.length;j++) {
						pc=product.category.toLowerCase();
						ps=product.subcategory.join(' ');
						ps=ps.toLowerCase();
						pn=product.name.toLowerCase();
						pk=product.keywords.join(' ');
						pk=pk.toLowerCase();
						pd=product.description.toLowerCase();
						pi=product.ingredients.join(' ');
						pi=pi.toLowerCase();
						if(pc.indexOf(q[j].toLowerCase())!=-1||ps.indexOf(q[j].toLowerCase())!=-1||pn.indexOf(q[j].toLowerCase())!=-1||pk.indexOf(q[j].toLowerCase())!=-1||pd.indexOf(q[j].toLowerCase())!=-1||pi.indexOf(q[j].toLowerCase())!=-1) {
							if(!$('#content #products').length) {
								$('#content').append('<div id="products" class="category"><h1>Products</h1></div>');
							}
							$('#products').append('<a href="/products/'+product.category.replace(/[\s&'!-#()]/g,'').toLowerCase()+'/'+product.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()+'/'+product.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'/" target="_self">'+listing(product,i)+'</a><hr>');
							//i?
						}
					}
				});
				//run search for other items such as blogs and ingredients
				
			});
		});
	});	
}

function listing(p,i) {
	l='<div id="'+p.category.replace(/[\s&'!-#()]/g,'').toLowerCase()+'/'+p.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()+'/'+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+i+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3><span class="categories">'+p.category+'>'+p.subcategory+'></span><br><span class="keywords">'+p.keywords.join(", ")+'</span><br><span class="description">'+p.description+'</span><br><span class="ingredients">Ingredients: '+p.ingredients+'</span></div></div>';
	return l
}
