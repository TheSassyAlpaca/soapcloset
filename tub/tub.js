$(function() {
	$('#content').append('<div id="items" class="region"><h1>Shopping Tub</h1><div class="content"></div></div>');
	$('#content').append('<div id="coupon" class="region"><h1>Coupon Code</h1><div class="content"></div></div>');
	$('#content').append('<div id="profession" class="region"><h1>Profession (Optional)</h1><div class="content"></div></div>');
	$('#content').append('<div id="fulfillment" class="region"><h1>Fulfillment</h1><div class="content"></div></div>');
	$('#content').append('<div id="contact" class="region"><h1>Contact</h1><div class="content"></div></div>');
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

fulfillmentList=[
	{option:'Pickup'},
	{option:'Deliver'},
	{option:'Ship'}
];

pickupList=[
	{option:'RAFB Exchange'},
	{option:'International City Farmers Market'},
	{option:'Perry Farmers Market'},
	{option:'Wesleyan Farmers Market'},
	{option:'The Market: Downtown Macon'}
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
					$(this).parent().find('input').next().removeClass('greyedOut');
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
					if(i.val()>=Number(i.attr('max'))) {
						i.val(Number(i.attr('max')));
						a=i.val();
						i.next().addClass('greyedOut');
					}
					if(i.val()!=0) {
						$(this).parents('.buy').find('.addToCart').css('display','none');
						$(this).parents('.listing').find('.listingRight span').text('$'+(i.val()*p.price));
						$(this).parents('.listing').find('.listingRight').attr('data-source',i.val()*p.price);
					} else {
						$(this).parents('.listing').remove();
					}
					changeCookie('cart',p.id.replace(/[\s&'!-#()]/g,'').toLowerCase(),a);
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
					if($(this).val()>=Number($(this).attr('max'))) {
						$(this).parent().find('input').next().addClass('greyedOut');
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
				$('#fulfillment .content').append('<input type="text" class="list" list="fulfillments" placeholder="Select a fulfillment method."><datalist id="fulfillments">'+dataList(fulfillmentList)+'</datalist><input type="text" class="list" list="pickups" style="display:none" placeholder="Select a pickup location."><datalist id="pickups">'+dataList(pickupList)+'</datalist><div id="address" style="display:none"><div class="line"><input type="text" placeholder="Street Address"></div><div class="line"><input type="text" placeholder="Street Address 2"></div><div class="line"><input type="text" placeholder="City"><input type="text" placeholder="State"><input type="text" placeholder="Zip Code"></div></div>');
				$('#fulfillment input').change(function() {
					if($(this).hasClass('list')) {
						val=$(this).val();
						if($(this).attr('list')=='fulfillments') {
							order.fulfillment=val;
							if(val=='Deliver'||val=='Ship') {
								$('#address').css('display','block');
								$('#fulfillments').next().css('display','none');
								delete order.pickup;
							} else {
								if(val=='Pickup') {
									$('#address').css('display','none');
									$('#fulfillments').next().css('display','block');
								} else {
									$('#address').css('display','none');
									$('#fulfillments').next().css('display','none');
								}
							}
						}
						if($(this).attr('list')=='pickups') {
							order.pickup=val;
						}
					} else {
						if($(this).parents($('#address').length)) {
							add={};
							$('#address').find('input').each(function() {
								add[$(this).attr('placeholder').replace(/[\s]/g,'')]=$(this).val();
							})
							order.address=add;
						}
					}
					checkCompletion();
					//total();
				})
				$('#contact .content').append('<input type="email" placeholder="Email address" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$">');
				$('#contact input').on('change keyup',function() {
					order.email=$(this).val();
					checkCompletion();
				})
				$('#totals .content').append('<div id="tubTotal" class="total"></div><div id="couponTotal" class="total"></div><div id="profTotal" class="total"></div><div id="estTotal" class="total"></div><span>This is your estimated total. Once we confirm your order we will apply discounts to give you the lowest price available.</span><button id="placeOrder" style="display:none">Place Order</button>');
				total();
				$('#placeOrder').click(function() {
					buildOrder();
				})
			});
		});
	})
}

function checkCompletion() {
	fulfilled=0;
	email=0;
	if($('#fulfillment').find('input').eq(0).val()=='Pickup'&&$('#fulfillment').find('input').eq(1).val().length) {
		fulfilled++;
	}
	if($('#fulfillment').find('input').eq(0).val()=='Deliver'||$('#fulfillment').find('input').eq(0).val()=='Ship') {
		fulfilled++;
	}
	if($('#contact input:valid').length!=0&&$('#contact input').val().indexOf('@')!=-1) {
		console.log('Email check: so far so good');
		console.log($('#contact input').val().substring($('#contact input').val().indexOf('@'),$('#contact input').val().length-1));
		if($('#contact input').val().substring($('#contact input').val().indexOf('@'),$('#contact input').val().length-1).indexOf('.')!=-1) {
			email++;
		}
	}
	console.log(order.estimate);
	if(fulfilled==0||email==0||order.estimate==0) {
		$('#placeOrder').css('display','none');
	}
	if(fulfilled!=0&&email!=0&&order.estimate>0) {
		$('#placeOrder').css('display','block');
	}
}

function buildOrder() {
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
	console.log(order);
	console.log(document.cookie);
	sendEvent('User','Order',JSON.stringify(order));
	userAlert('Order Submitted! Check your email for confirmation and status!');
	submitForm('https://docs.google.com/forms/d/e/1FAIpQLSdCEcSCvTvPhQZriFjsO5w7b_NukS_SRw8XFCUzjk2bTpZ33A/formResponse?usp=pp_url&entry.148047722=',['entry.1353804064'],[encodeURIComponent(JSON.stringify(order)),order.email]);
	emptyTub();
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
	checkCompletion();
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
					if(products[j].id.replace(/[\s&'!-#()]/g,'').toLowerCase()==k&&cart[k]>0) {
						p=products[j];
						list=list+'<div id="'+p.id.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="listing" data="'+j+'"><div class="listingLeft"><div style="background-image:url('+p.images[0]+')"></div></div><div class="listingMid"><h3>'+p.name+'</h3></div><div class="listingRight" data-source="'+(cart[k]*p.price)+'"><span>$'+(cart[k]*p.price)+'</span><div class="buy"><button class="addToCart">Add To Cart</button><div><button class="down">&#x25BC;</button><input type="text" value="'+cart[k]+'" min=0 max='+p.qty+'><button>&#x25B2;</button></div></div></div></div><hr>';
					}
				}
			}
		}
	}
	return list
}

function emptyTub() {
	now = new Date();
	time = now.getTime();
	expireTime = time + (1000*60*60*24*30);
	now.setTime(expireTime);
	expire=now.toGMTString();
	console.log(expire);
	document.cookie='cart={};expires='+expire+';path=/;domain=.thesassyalpaca.com';
	countCart();
}
