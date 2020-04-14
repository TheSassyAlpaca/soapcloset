$(function() {
	$('#content').addClass('blogIt');
	console.log($(location));
	if($(location)=="https://www.thesassyalpaca.com/blog/") {
		
	}
	$('#content.blogIt').children('.blogBanner').first().append('<div id="shareTool"></div>');
	$('#shareTool').click(function() {
		console.log('clicky');
		//test and update the objects as needed...
		socialMediaShares=[
			{icon:'facebook.png',href:'https://www.facebook.com/sharer/sharer.php?u='+encodeURI($(location).attr("href"))},
			{icon:'twitter.png',href:'https://twitter.com/intent/tweet?text='+encodeURI($(location).attr("href"))},
			{icon:'linkedin.png',href:'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURI($(location).attr("href"))+'&title='+encodeURI($("meta[property='og:title']").attr("content"))+'&summary='+encodeURI($("meta[property='og:description']").attr("content"))+'&source=The Sassy Alpaca'},
			{icon:'pinterest.png',href:'https://pinterest.com/pin/create/button/?url='+encodeURI($(location).attr("href"))+'&media='+encodeURI($("meta[property='og:image']").attr("content"))+'&description='+encodeURI($("meta[property='og:description']").attr("content"))}
		];
		console.log(socialMediaShares);
		$('body').append('<div id="shareModul"><div id="shareContainer"></div></div>');
		for(s=0;s<socialMediaShares.length;s++) {
			$('#shareContainer').append('<a href="'+socialMediaShares[s].href+'" target="_blank"><div style="background-image: url(/images/'+socialMediaShares[s].icon+')"></div></a>');
		}
		$('#shareModul').click(function() {
			$('#shareModul').remove();
		})
	})
})
