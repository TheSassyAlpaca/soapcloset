menu=[
	{item:'Products',sandwich:'products',link:'/product'},
	{item:'Shops & Markets',sandwich:'s_and_m',link:'/shops_and_markets'},
	{item:'About Us',sandwich:'none',link:'/about_me.html'},
	{item:'Contact Us',sandwich:'none',link:'/contact_me.html'},
	//{item:'Gallery',sandwich:'none',link:'/gallery.html'}
];

$(document).ready(function() {
	updateCart();
	$('#blt').click(function() {
		resolved=0;
		console.log(resolved);
		if(resolved===0&&!$(this).hasClass('open')&&!$(this).hasClass('deep')) {
			$(this).addClass('open');
			$('#blt-container').addClass('open');
			//open menu
			stackTheSandwich();
			resolved++;
		}
		if(resolved===0&&$(this).hasClass('open')) {
			$(this).removeClass('open');
			$('#blt-container').removeClass('open');
			$('.subMenuContainer').each(function() {
				$(this).remove();
			})
			//menu closes
			resolved++;
		}
		if(resolved===0&&$(this).hasClass('deep')) {
			$(this).addClass('open').removeClass('deep');
			if(!$('#blt-container').hasClass('open')) {
				$('#blt-container').addClass('open');
			}
			$('.subMenuContainer').each(function() {
				$(this).remove();
			})
			resolved++;
		}
		console.log(resolved);
	})
	for(i=0;i<menu.length;i++) {
		if(menu[i].link!=='none') {
			$('#footerMenu').append('<div class="menuItem" addy="'+menu[i].link+'">'+menu[i].item+'</div>');
		}
		$('.menuItem').click(function() {
			location.href=$(this).attr('addy');
		})
	}
	sm=[
		{id:'Facebook',link:'https://www.facebook.com/sassyalpaca',icon:'/images/facebook.png',share:'https://www.facebook.com/sharer/sharer.php?u='},
		{id:'Instagram',link:'https://www.instagram.com/alpacasassy/',icon:'/images/instagram.png'},
		{id:'Twitter',link:'https://twitter.com/SassyAlpaca1',icon:'/images/twitter.png',share:'https://twitter.com/intent/tweet?url='},
		{id:'Etsy',link:'https://www.etsy.com/shop/TheSassyAlpacaLLC',icon:'/images/etsy.png'}
	];
	for(i=0;i<sm.length;i++) {
		$('#socialMediaBar').append('<a href="'+sm[i].link+'" target="_blank"><img src="'+sm[i].icon+'"></a>');
	}
	$('#subscribe').click(function() {
		email=$(this).prev().children('input').val();
		id='NA';
		if($(this).prev().children('input').attr('name').length!==0) {
			id=$(this).prev().children('input').attr('name');
		}
		$('#basement').append('<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeOQKOaVn7oDYXnIktlJnx2IMLc1mgKtrcJp19HM-QQt1iTFQ/formResponse?usp=pp_url&entry.148047722='+id+'&entry.1353804064='+email+'">');
	})
	$('#homer').click(function() {
		location.href='/';
	})
	$('#userLog').click(function() {
		openLoginModal();
	})
	$('#userCart').click(function() {
		location.href='/shopping_tub';
	})
	$('#legals div').click(function() {
		location.href=$(this).attr('name');
	})
	
	//always last!!
	contentHeight=$(window).height()-$('header').outerHeight()-$('footer').outerHeight();
	if(contentHeight>($(window).height()-60)) {
		contentHeight=$(window).height()-60;
	}
	$('#content').css('min-height',contentHeight);
})

function stackTheSandwich(x) {
	products=[
		{item:'Soap',sandwich:'none',link:'/product/soap'},
		{item:'Lotion',sandwich:'none',link:'/product/lotion'},
		{item:'Face Creams',sandwich:'none',link:'/product/face_creams'},
		{item:'Sprays',sandwich:'none',link:'/product/sprays'},
		{item:'Salts',sandwich:'none',link:'/product/salts'}
	]
	s_and_m=[];
	container='';
	if(x==null) {
		x=menu;
		container=$('#blt-container');
	} else {
		$('#blt').addClass('deep').removeClass('open');
		console.log(x);
		$('header').append('<div id="'+x+'-container" class="subMenuContainer"></div>');
		container=$('#'+x+'-container');
		x=window[x];
	}
	//build X
	loc=location.href;
	for(i=0;i<x.length;i++) {
		item=x[i].item.replace(/[\s&]+/g,'');
		//itemSandwich=x[i].sandwich;
		console.log(item);
		console.log(container.children('#'+item+'Menu').length);
		if(!container.children('#'+item+'Menu').length) {
			container.append('<div id="'+item+'Menu" class="menuItem" name="'+x[i].sandwich+'" addy="'+x[i].link+'">'+x[i].item+'</div>');
			console.log(x[i]);
		}
		container.children('.menuItem').each(function() {
			$(this).unbind('click');
			$(this).click(function() {
				if($(this).attr('name')!=='none') {
					stackTheSandwich($(this).attr('name'));
				} else {
					goToLink($(this).attr('addy'));
				}
			})
		})
		if(x[i].link!=='none'&&loc.indexOf(x[i].link)!=-1) {
			$('#'+item+'Menu').addClass('active');
		}
	}
}

function goToLink(x) {
	location.href=x;
}

function userAlert(x) {
	$('body').append('<div id="userAlert">'+x+'</div>');
	setTimeout(function() {
		$('#userAlert').remove();
	},5000)
}








