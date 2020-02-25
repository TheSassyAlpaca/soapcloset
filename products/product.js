$(function() {
	getProduct();
})

function getProduct() {
	getP=window.location.href.substring(47,window.location.href.lastIndexOf("/"));
	product={};
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					if(product.name.replace(/[\s&'!-#()]/g,'').toLowerCase()==getP) {
						
					}
				});
				//title
				//keywords
				$('#content').append('<div id="title"><h1>'+product.name+'</h1><span>'+listKeywords(product.keywords)+'</span></div>');
				//image slides
					//image thumbs
					//slide mechanics
				$('#content').append('<div id="slideshow"><div id="slideHolder"></div></div>');
				$('#slideshow').append('<div id="slideThumb">'+slides(product.images)+'</div>');
				//price
					//bulk rates
				$('#content').append('<div id="pricing"><div class="priceBox"><div>$'+product.price+'</div><div><div>'+product.unit+'</div><div class="bulk">'+product.bulk.join(', ')+'</div></div></div></div>');
				//description
				$('#content').append('<div id="description">'+product.description+'</div>');
				//ingredients
				$('#content').append('<div id="ingredients">Ingredients'+ingredients(product.description)+'</div>');
				//functions
				//slideshow
				$('.slide').click(function() {
					$('#slideHolder').css('background-image',$(this).css('background-image'));
				})
				//ingredients tooltip
				$('.ingredients').on('hover click',function() {
					console.log($(this).attr('data-source'));
				})
			})
		});
	});
}

function ingredients(ing) {
	ingredients='';
	for(i=0;i<ing.length;i++) {
		ingredients=ingredients+'<div class="ingredient" data-source="'+ing[i].replace(/[\s&'!-#()]/g,'').toLowerCase()+'">'+ing[i]+'</div>';
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
