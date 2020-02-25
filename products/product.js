$(function() {
	getProduct();
})

function getProduct() {
	p=window.location.href.substring(47,window.location.href.lastIndexOf("/"));
	console.log(p);
	console.log(window.location.href);
	console.log(window.location.href.lastIndexOf("/")+1);
	console.log(window.location.href.indexOf('#'));
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					product=JSON.parse(entry.gsx$data.$t);
					if(product.name.replace(/[\s&'!-#()]/g,'').toLowerCase()==p) {
						console.log(product);
					}
				});
				//
			})
		});
	});
}
