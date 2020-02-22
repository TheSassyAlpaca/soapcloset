//+blt
//+home
//go to cart
//update cart count
//+subscribe
//+search bar
//+social area

$(function() {
	$('#home').click(function() {
		window.location.href="/";
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
})

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
	
}

function buildSearch() {
	
}

function submitForm(f,q,a) {
	fSub=f+a[0];
	for(i=0;i<q.length;i++) {
		fSub=fSub+'&'+q[i]+'='+a[i+1];
	}
	$('#basement').append('<iframe src="'+f+'">');
}
