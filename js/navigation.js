$(function() {
	downloadProducts();
})

function downloadProducts() {
	window['products']=[]
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/4/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					p=JSON.parse(entry.gsx$data.$t);
					products.push(p);
					console.log(p);
					console.log(p.name);
					console.log(p.keywords);
				});
				//dataPulls("getSongs");
			});
		});
	})
}
