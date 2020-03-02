$(function() {
	$('#home').click(function() {
		window.location.href="/";
	})
	$('#cart').click(function() {
		window.location.href="/tub";
	})
	$('.subscribe button').click(function() {
		f="";
		q=[];
		a=[];
		a.push($(this).parent().find('input.searchInput').val());
		submitForm(f,q,a);
	})
	buildBLT();
	buildSocialMedia();
	buildSearch();
	countCart();
})

function countCart() {
	c=document.cookie;
	cooks=c.split('; ');
	q=0;
	cart={};
	//name=p.name.replace(/[\s&'!-#()]/g,'').toLowerCase();
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
			for(k in cart) {
				console.log(cart[k]);
				q=q+Number(cart[k]);
			}
		}
	}
	//return q
	console.log(q);
	if($('#cartCount').length==0) {
		$('#cart').append('<div id="cartCount"></div>');
	}
	$('#cartCount').text(q);
}

function buildBLT() {
	$('#blt').append('<div id="bltBody"><div class="bltMenu"></div><div class="socialArea"></div></div>');
	menuObject=[{name:'Products',src:'/products'},{name:'Shops & Markets',src:'/shops_and_markets'},{name:'Ingredients',src:'/ingredients'},{name:'Gallery',src:'/gallery'},{name:'Blog',src:'/blog'}];
	for(i=0;i<menuObject.length;i++) {
		$('.bltMenu').append('<a href="'+menuObject[i].src+'" class="menuItem">'+menuObject[i].name+'</a>');
	}
	$('#blt').click(function() {
		$(this).toggleClass('expand');
	})
	$('.menuItem').click(function(e) {
		e.stopPropagation();
	})
}

function buildSocialMedia() {
	socialMedia=[
		{icon:'facebook.png',href:'https://www.facebook.com/sassyalpaca'},
		{icon:'twitter.png',href:'https://twitter.com/SassyAlpaca1'},
		{icon:'instagram.png',href:'https://www.instagram.com/alpacasassy'},
		{icon:'etsy.png',href:'https://www.etsy.com/shop/TheSassyAlpacaLLC'},
		{icon:'pinterest.png',href:'/pinterest'}
	];
	img="https://soapcloset.thesassyalpaca.com/images/";
	for(i=0;i<socialMedia.length;i++) {
		$('.socialArea').append('<a href="'+socialMedia[i].href+'" class="socialLink" target="_blank"><img src="'+img+socialMedia[i].icon+'"></a>');
	}
	$('.socialLink').each(function() {
		if($(this).attr('href').indexOf('etsy')!=-1) {
			$(this).css('filter','invert(1)');
		}
	})
}

function buildSearch() {
	$('#search').append('<div class="searchBar"></div>');
	$('#search').click(function(e) {
		e.stopPropagation();
		$(this).toggleClass('open');
	})
	$('.searchBar').click(function(e) {
		e.stopPropagation();
	})
	//add all to searchBar element
	$('.searchBar').append('<div class="back"><img src="/images/left.png"></div><input placeholder="Search"><button><img src="/images/search.png"></button>');
	$('.searchBar button').click(function(e) {
		searchThis($(this).parent().find('input').val());
	})
	$('.searchBar input').on('keypress', function(e) {
		if (e.keyCode==13) {
			e.preventDefault();
			e.target.blur();
			searchThis($(this).parent().find('input').val());
        }
	})
	$('.back').click(function(e) {
		e.stopPropagation();
		$('#search').removeClass('open');
	})
}

function submitForm(f,q,a) {
	fSub=f+a[0];
	for(i=0;i<q.length;i++) {
		fSub=fSub+'&'+q[i]+'='+a[i+1];
	}
	$('#basement').append('<iframe src="'+f+'">');
}

function searchThis(x) {
	window.location.href='/search?q='+x+'&f=NA';
}

function userAlert(x) {
	t=3000+(x.length * 10);
	if(!$('#userAlert').length) {
		$('#content').append('<div id="userAlert"></div>')
	}
	e=$('#userAlert');
	e.text(x);
	e.addClass('alert');
	setTimeout(function() {
		e.removeClass('alert');
		e.text();
	},t)
}


function getValue(p) {
	//check cookies for this product using p.name.replace(/[\s&'!-#()]/g,'')
	c=document.cookie;
	cooks=c.split('; ');
	q=0;
	cart={};
	name=p.name.replace(/[\s&'!-#()]/g,'').toLowerCase();
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
			if(name in cart) {
				q=cart[name];
			}
		}
	}
	if(p.qty<q) {
		q=p.qty;
	}
	return q
}

function changeCookie(c,p,a) {
	console.log(c,p,a);
	console.log(document.cookie);
	c=document.cookie;
	cooks=c.split('; ');
	cart={};
	name=p;
	found=0;
	for(i=0;i<cooks.length;i++) {
		cookie=cooks[i].split('=');
		if(cookie[0]=='cart') {
			cart=JSON.parse(cookie[1]);
		}
	}
	cart[name]=a;
	document.cookie='cart='+JSON.stringify(cart)+';path=/;domain=.thesassyalpaca.com';
	countCart();
}
