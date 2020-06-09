tempFolder="";
safe=6;

$(function() {
	downloadProducts();
})

function downloadProducts() {
	window['products']=[];
	$(function() {
		pKey="1Z14hYfA6TiRhZ1zwZ3vehgOwQ2pfDL4A5wn1PPVFmhE";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					if(entry.gsx$data.$t!='{}') {
						p=JSON.parse(entry.gsx$data.$t);
						products.push(p);
						if($('#'+p.category.replace(/[\s&'!-#()]/g,'')).length==0) {
							$('#content').append('<div id="'+p.category.replace(/[\s&'!-#()]/g,'')+'" class="category"><div class="catHeader" style="background-image:url('+p.images[0]+')"><h1>'+p.category+'</h1><hr><div class="photoBox"></div><hr></div></div>');
							$('#'+p.category.replace(/[\s&'!-#()]/g,'')).find('.photoBox').append('<div class="proPhoto"><img src="'+p.images[0]+'"></div>');
						}
						photoCheck=0;
						$('#'+p.category.replace(/[\s&'!-#()]/g,'')).find('.photoBox').find('img').each(function() {
							if($(this).attr('src')==p.images[0]) {
								photoCheck++;
							}
						})
						if(photoCheck==0) {
							$('#'+p.category.replace(/[\s&'!-#()]/g,'')).find('.photoBox').append('<div class="proPhoto"><img src="'+p.images[0]+'"></div>');
						}
						for(s=0;s<p.subcategory.length;s++) {
							if($('#'+p.category.replace(/[\s&'!-#()]/g,'')).children('#'+p.subcategory[s].replace(/[\s&'!-#()]/g,'')).length==0) {
								$('#'+p.category.replace(/[\s&'!-#()]/g,'')).append('<div id="'+p.subcategory[s].replace(/[\s&'!-#()]/g,'')+'" class="subcategory"><h2>'+p.subcategory[s]+'</h2></div>');
							}
							$('#'+p.category.replace(/[\s&'!-#()]/g,'')).children('#'+p.subcategory[s].replace(/[\s&'!-#()]/g,'')).append(listing(p,i,p.subcategory[s]));
						}
					}
				});
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
					sendEvent('User','Bulk Rates','Interest');
				})
				$('.listingLeft, .listingMid h3').click(function(e) {
					e.stopPropagation();
					p=products[$(this).parents('.listing').attr('data')];
					window.location.href=tempFolder+"/products/"+p.category.replace(/[\s&'!-#()]/g,'').toLowerCase()+"/"+p.subcategory[0].replace(/[\s&'!-#()]/g,'').toLowerCase()+"/"+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+"/";
				})
				$('.buy input').each(function() {
					if($(this).val()!=0) {
						$(this).parent().parent().children('.addToCart').css('display','none');
					}
					if($(this).val()>=Number($(this).attr('max'))) {
						$(this).parent().find('input').next().addClass('greyedOut');
					}
				})
				//goToHash();
			});
		});
	})
}

$(window).load(function() {
	goToHash();
})

function listing(p,i,s) {
	l='<div id="'+p.category.replace(/[\s&'!-#()]/g,'')+s.replace(/[\s&'!-#()]/g,'')+p.name.replace(/[\s&'!-#()]/g,'')+'" class="listing" data="'+i+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3><span class="keywords">'+p.keywords.join(", ")+'</span>'+checkInventory(p.qty,p.name)+'<br><span class="description">'+p.description+'</span></div><div class="listingRight"><span>$'+p.price+'</span>'+bulkRates(p)+'<div class="buy"></div></div></div><hr>';
	return l
}

function goToHash() {
	if($(location).attr('hash').length) {
		hash=$(location).attr('hash');
		$(hash).parents('.category, .subcategory, .lessercategory').addClass('expand');
		$(hash).addClass('expand');
		$([document.documentElement, document.body]).animate({
			scrollTop: $(hash).offset().top - 60
		}, 1500);
	}
}

function checkInventory(i,n) {
	alert='';
	if(i<=safe) {
		alert='<br><span style="color: red">'+i+' '+n+' remaining.</span>';
	}
	return alert
}

function bulkRates(p) {
	b='';
	if('bulk' in p && p.bulk!==[]) {
		b='<div class="bulkRates"><span>Bulk Prices</span><div><span>'+p.bulk.join('</span><br><span>')+'</span></div></div>';
	}
	return b
}
