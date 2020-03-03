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
	{option:'Fire/Rescue',disc:'10',text:'Enjoy a 10% discount on your entire order.'},
	{option:'Other',disc:'0',text:''},
	{option:'Prefer Not To Say',disc:'0',text:''}
];

order={};

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
						$(this).parents('.listing').find('.listingRight').attr('data-source',i.val()*p.price);
					} else {
						$(this).parents('.listing').remove();
					}
					changeCookie('cart',p.name.replace(/[\s&'!-#()]/g,'').toLowerCase(),a);
					userAlert(a+' '+p.name+' are now in your cart.');
					total();
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
						if($('#coupon input').val().toLowerCase()==coupon[j].code) {
							codeFound++;
							$('#coupon').attr('data-source',coupon[j].disc);
							$('#coupon span').text(coupon[j].text);
						}
					}
					if(codeFound==0) {
						$('#coupon').attr('data-source','')
						$('#coupon span').text('');
					}
					total();
				})
				$('#profession .content').append('<input type="text" list="professions"><datalist id="professions">'+dataList(professionList)+'</datalist><span></span>');
				$('#profession input').change(function() {
					val=$(this).val()
					codeFound=0;
					for(j=0;j<professionList.length;j++) {
						if(professionList[j].option==val) {
							codeFound++;
							$('#profession').attr('data-source',professionList[j].disc);
							$('#profession span').text(professionList[j].text);
						}
					}
					if(codeFound==0) {
						$('#profession').attr('data-source','');
						$('#profession span').text('');
					}
					total();
				})
				$('#totals .content').append('<div id="tubTotal" class="total"></div><div id="couponTotal" class="total"></div><div id="profTotal" class="total"></div><div id="estTotal" class="total"></div><span>This is your estimated total. Once we confirm your order we will apply discounts to give you the lowest price available.</span><button id="placeOrder">Place Order</button>');
				total();
				$('#placeOrder').click(function() {
					c=document.cookie;
					cooks=c.split('; ');
					cart={};
					for(i=0;i<cooks.length;i++) {
						cookie=cooks[i].split('=');
						if(cookie[0]=='cart') {
							cart=JSON.parse(cookie[1]);
							order.cart=cart;
						}
					}
					console.log(cart);
				})
			});
		});
	})
}

function total() {
	tubTotal=0;
	$('#items .listingRight').each(function() {
		console.log(Number($(this).attr('data-source')));
		tubTotal=tubTotal+Number($(this).attr('data-source'));
	});
	$('#tubTotal').empty().append('<label>Subtotal:</label><span>$'+tubTotal.toFixed(2)+'</span>');
	couponTotal=0;
	if(!isNaN(Number($('#coupon').attr('data-source')))) {
		couponTotal=Number($('#coupon').attr('data-source'));
		$('#couponTotal').empty().append('<label>Coupon Code:</label><span>-'+couponTotal+'%</span>');
		order.coupon=$('#coupon input').val();
	} else {
		delete order.coupon;
	}
	console.log(couponTotal);
	profTotal=0;
	if(!isNaN(Number($('#profession').attr('data-source')))) {
		profTotal=Number($('#profession').attr('data-source'));
		$('#profTotal').empty().append('<label>Profession:</label><span>-'+profTotal+'%</span>');
		order.profession=$('#profession input').val();
	} else {
		delete order.profession;
	}
	console.log(profTotal);
	estTotal=tubTotal*((100-couponTotal-profTotal)/100);
	console.log(estTotal);
	$('#estTotal').empty().append('<label>Estimated Total:</label><span>$'+estTotal.toFixed(2)+'</span>');
	order.estimate=estTotal;
	console.log(order);
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
	cart={};
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
						list=list+'<div id="'+p.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+j+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3></div><div class="listingRight" data-source="'+(cart[k]*p.price)+'"><span>$'+(cart[k]*p.price)+'</span><div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+cart[k]+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div></div><hr>';
					}
				}
			}
		}
	}
	return list
}
