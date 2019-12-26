$(document).ready(function() {
	$('#blt').click(function() {
		resolved=0;
		console.log(resolved);
		if(resolved===0&&!$(this).hasClass('open')&&!$(this).hasClass('deep')) {
			$(this).addClass('open');
			$('#blt-container').addClass('open');
			//open menu
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
