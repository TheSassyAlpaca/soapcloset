map="https://www.google.com/maps/d/embed?mid=1Ur_3A9sCrxrMDNeVaCBaHhCWKslitKgN&ll="

$(function() {
	//build page framework
	$('#content').append('<div id="map"><iframe src=""></iframe"></div><div id="shops" class="category"><h1>Shops</h1></div><div id="markets" class="category"><h1>Markets</h1>');
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
						$('#shops').append('<div id="'+e.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="event" data-source="'+e.gps+'"><div class="eImg"></div><div eMid"><h2>'+e.name+'</h2><div class="eBody">'+e.frequency+'<br>'+e.address+'<br>'+e.website+'<div class="eSocial">'+e.facebook+e.instagram+'</div><div class="eRight"></div></div>');
					} else {
						markets.push(e);
					}
					if(i==0) {
						$('#map iframe').attr('src',map+e.gps.replace(', ','%2C')+'z11');
					}
					console.log(e)
				});
			});
		});
	})
}
