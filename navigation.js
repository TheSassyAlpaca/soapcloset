$(document).ready(function() {
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
	$('#content').css('min-height',$(document).height()-$('header').outerHeight()-$('footer').outerHeight()-10);
})

function stackTheSandwich(x) {
	menu=[
		{item:'Products',sandwich:'products',link:'none'},
		{item:'Shops & Markets',sandwich:'s_and_m',link:'none'},
		{item:'About Us',sandwich:'none',link:'/about-us.html'},
		{item:'Gallery',sandwich:'none',link:'/gallery.html'}
	]
	products=[
		{item:'Soap',sandwich:'none',link:'/soap.html'},
		{item:'Lotion',sandwich:'none',link:'/lotion.html'},
		{item:'Sprays',sandwich:'none',link:'/sprays.html'}
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
		itemSandwich=x[i].sandwich;
		console.log(item);
		console.log(container.children('#'+item+'Menu').length);
		if(!container.children('#'+item+'Menu').length) {
			container.append('<div id="'+item+'Menu" class="menuItem" name="'+x[i].sandwich+'">'+x[i].item+'</div>');
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










