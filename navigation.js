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
			$('.blt-submenu').each(function() {
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
			$('.blt-submenu').each(function() {
				$(this).remove();
			})
			resolved++;
		}
		console.log(resolved);
	})
})

function stackTheSandwich(x) {
	menu=[
		{item:'Products',sandwich:'products',link:'none'},
		{item:'Stores & Markets',sandwich:'s_and_m',link:'none'},
		{item:'About Us',sandwich:'none',link:'/about-us.html'},
		{item:'Gallery',sandwich:'none',link:'/gallery.html'}
	]
	products=[
		{item:'Soap',sandwich:'none',link:'/soap.html'},
		{item:'Lotion',sandwich:'none',link:'/lotion.html'},
		{item:'Sprays',sandwich:'none',link:'/sprays.html'}
	]
	container='';
	if(x==null) {
		x=menu;
		container=$('#blt-container');
	} else {
		console.log(x);
		x=window[x];
		$(header).append('<div id="'+x+'-container" class="subMenuContainer"></div>');
		container=$('#'+x+'-container');
	}
	//build X
	loc=location.href;
	for(i=0;i<x.length;i++) {
		item=x[i].item.replace(/[\s&]+/g,'');
		console.log(item);
		console.log(container.children('#'+item+'Menu').length);
		if(!container.children('#'+item+'Menu').length) {
			container.append('<div id="'+item+'Menu" class="menuItem">'+x[i].item+'</div>');
			if(x[i].sandwich!='none') {
				$('#'+item+'Menu').click(function() {
					console.log(x[i].sandwich);
					stackTheSandwich(x[i].sandwich);
				})
			}
		}
		if(x[i].link!=='none'&&loc.indexOf(x[i].link)!=-1) {
			$('#'+item+'Menu').addClass('active');
		}
	}
}











