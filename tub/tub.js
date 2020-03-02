/* build framework 
items
coupon codes
profession
fulfillment method
subTotal

location
*/

/* PROFESSION
	dropdown of professions with discounts
	show benefit, only if there is a benefit
*/

/* SUBTOTALS
	ITEM subtotal
	DISCOUNT
		COUPON (%)
		PROFESSION (%)
		**SPECIALS
	ESTIMATED TOTAL
*/

/* FULFILLMENT
	radial button for Pickup, Delivery, Shipping
	if Pickup: select location
	if Delivery: select county (list of counties delivered to)
	if Shipping or Delivery: enter address
*/

$(function() {
	$('#content').append('<div id="items" class="region"><h1>Shopping Tub</h1><div class="content"></div></div>');
	$('#content').append('<div id="coupon" class="region"><h1>Coupon Code</h1><div class="content"></div></div>');
	$('#content').append('<div id="profession" class="region"><h1>Profession (Optional)</h1><div class="content"></div></div>');
	$('#content').append('<div id="totals" class="region"><h1>Estimated Total</h1><div class="content"></div></div>');
	downloadProducts();
})

professionList=[
	{option:'Military',disc:'10',text:'Enjoy a 10% discount on your entire order.'},
	{option:'Medical',disc:'10',text:'Enjoy a 10% discount on your entire order.'},
	{option:'Education',disc:'10',text:'Enjoy a 10% discount on your entire order.'},
	{option:'EMS/EMT',disc:'10',text:'Enjoy a 10% discount on your entire order.'},
	{option:'Police',disc:'10',text:'Enjoy a 10% discount on your entire order.'},
	{option:'Fire/Rescue',disc:'10',text:'Enjoy a 10% discount on your entire order.'}
];

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
				});
				//get items from cookies
				$('#items .content').append(showTub());
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
					if(i.val()>i.attr('max')) {
						i.val(i.attr('max'));
						a=i.val();
					}
					if(i.val()!=0) {
						$(this).parents('.buy').find('.addToCart').css('display','none');
						$(this).parents('.listing').find('.listingRight span').text('$'+(i.val()*p.price));
						//listingRight
					} else {
						$(this).parents('.listing').remove();
					}
					changeCookie('cart',p.name.replace(/[\s&'!-#()]/g,'').toLowerCase(),a);
					userAlert(a+' '+p.name+' are now in your cart.');
				})
				$('.listingLeft, .listingMid h3').click(function(e) {
					e.stopPropagation();
					p=products[$(this).parents('.listing').attr('data')];
					window.location.href="/products/"+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase();
				})
				$('.buy input').each(function() {
					if($(this).val()!=0) {
						$(this).parent().parent().children('.addToCart').css('display','none');
					}
				})
				$('#coupon .content').append('<input type="text" placeholder="Enter Coupon Code"><span></span>');
				$('#coupon input').on('change keyup',function() {
					coupon=[
						{code:'villagemarketplace',disc:'10',text:'This coupon gives you 10% off your entire purcahse and supports Village Marketplace.'},
						{code:'marketplaceatpaynemill',disc:'10',text:'This coupon gives you 10% off your entire purcahse and supports The Marketplace at Payne Mill.'}
					];
					console.log($('#coupon input').val());
					codeFound=0;
					for(j=0;j<coupon.length;j++) {
						if($('#coupon input').val()==coupon[j].code) {
							codeFound++;
							$('#coupon').attr('data-source',coupon[j].disc);
							$('#coupon span').text(coupon[j].text);
						}
					}
					if(codeFound==0) {
						$('#coupon').attr('data-source','')
						$('#coupon span').text('');
					}
				})
				$('#profession .content').append('<input type="text" list="professions"><datalist id="professions">'+dataList(professionList)+'</datalist><span></span>');
				$('#profession input').change(function() {
					val=$(this).val()
					codeFound=0;
					for(j=0;j<professionList.length;j++) {
						if(professionList[j].option==val) {
							codeFound++;
							$('#profession').attr('data-source',professionList[j].disc);
							$('#profession span').text(coupon[j].text);
						}
					}
					if(codeFound==0) {
						$('#profession').attr('data-source','');
						$('#profession span').text('');
					}
				})
			});
		});
	})
}

function total() {
	
}

function dataList(l) {
	dataset='';
	for(i=0;i<l.length;i++) {
		dataset=dataset+'<option value="'+l[i].option+'">'
	}
	return dataset
}

function showTub() {
	c=document.cookie;
	cooks=c.split('; ');
	//q=0;
	cart={};
	//name=p.name.replace(/[\s&'!-#()]/g,'').toLowerCase();
	list='';
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
			for(k in cart) {
				console.log(cart[k]);
				for(j=0;j<products.length;j++) {
					if(products[j].name.replace(/[\s&'!-#()]/g,'').toLowerCase()==k&&cart[k]>0) {
						p=products[j];
						list=list+'<div id="'+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+j+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3></div><div class="listingRight"><span>$'+(cart[k]*p.price)+'</span><div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+cart[k]+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div></div><hr>';
					}
				}
			}
		}
	}
	return list
}
