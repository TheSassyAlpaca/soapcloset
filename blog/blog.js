$(function() {
	$('#content').addClass('blogIt');
	console.log($(location).attr('href'));
	if($(location).attr('href')=="https://www.thesassyalpaca.com/blog/"||$(location).attr('href').substring(0,$(location).attr('href').indexOf("?")-1)=="https://www.thesassyalpaca.com/blog/") {
		console.log("Yes");
		$(function() {
			pKey="1Z14hYfA6TiRhZ1zwZ3vehgOwQ2pfDL4A5wn1PPVFmhE";
			$(function() {
				$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/15/public/values?alt=json-in-script&callback=?",
				function (data) {
					$.each(data.feed.entry, function(i,entry) {
						blog=JSON.parse(entry.gsx$data.$t);
						blogs.push(blog);
						if(blog.url.length>10) {
							$('#content').append('<a href="'+blog.url+'" target="_self"><div class="blogThumb"><div class="blogSnippet"><h1>'+blog.title+'</h1><span>'+blog.snippet+'</span></div></div></a>');
						}
					});
					//
				});
			});
		});
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
