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
	if(x==null) {
		x=menu;
	} else {
		console.log(x);
	}
	//build X
	bltc=$('#blt-container');
	loc=location.href;
	for(i=0;i<x.length;i++) {
		if(!bltc.children('#'+x[i].item+'Menu')) {
			bltc.append('<div id="'+x[i].item+'Menu" class="menuItem">'+x[i].item+'</div>');
			$('#'+x[i].item+'Menu').click(function() {
				stackTheSandwich(x[i].sandwich);
			})
		}
		if(x[i].link!=='none'&&loc.indexOf(x[i].link)!=-1) {
			$('#'+x[i].item+'Menu').addClass('active');
		}
	}
}











