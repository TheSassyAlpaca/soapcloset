$(function() {
	//get list of shops and markets from DB
	//separate shops from markets
	shops=[];
	markets=[];
	//loop through shops and markets respectively and perform their function
	/*shops will show:
		image(s)
		name
		address
		website
		social media (limit - FB,Insta)
	*/
	/*markets will show:
		image(s)
		name
		address
		website
		frequency (text)
		social media (limit - FB,Insta)
	*/
	getShopsAndMarkets();
})

function getShopsAndMarkets() {
	$(function() {
		pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
		$(function() {
			$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/10/public/values?alt=json-in-script&callback=?",
			function (data) {
				$.each(data.feed.entry, function(i,entry) {
					e=JSON.parse(entry.gsx$data.$t);
					if(e.type=="shop") {
						shops.push(e);
					} else {
						markets.push(e);
					}
					console.log(e)
				});
			});
		});
	})
}
