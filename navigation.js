$(document).ready(function() {
	$('#blt').click(function() {
		resolved=0;
		console.log(resolved);
		if(resolved===0&&!$(this).hasClass('open')&&!$(this).hasClass('deep')) {
			$(this).addClass('open');
			//open menu
			resolved++;
		}
		if(resolved===0&&$(this).hasClass('open')) {
			$(this).removeClass('open');
			//menu closes
			resolved++;
		}
		if(resolved===0&&$(this).hasClass('deep')) {
			$(this).addClass('open').removeClass('deep');
			resolved++;
		}
		console.log(resolved);
	})
})
