map="https://www.google.com/maps/d/embed?mid=1Ur_3A9sCrxrMDNeVaCBaHhCWKslitKgN&ll="

$(function() {
	$('#content').append('<div id="map"><iframe src="'+map+'32.805007368420775%2C-83.62111061384797&z=11"></iframe></div><div id="samContainer"><div id="shops" class="category"><h1>Shops</h1></div><div id="markets" class="category"><h1>Markets</h1></div></div>');
	shopList=[];
	marketList=[];
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
						shopList.push(e);
						if(e.address!="NA"&&e.image!="NA") {
							$('#shops').append('<div id="'+e.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="event" data-source="'+e.gps+'"><div class="eImg" style="background-image: url('+e.image+')"></div><div class="eMid"><h2>'+e.name+'</h2><div class="eBody">'+e.address.replace(', ','</br>')+'<br><a href="'+e.website+'">Website</a><div class="eSocial"><a href="'+e.facebook+'"><img src="/images/facebook.png"></a><a href="'+e.instagram+'"><img src="/images/instagram.png"></a></div><div class="eRight"></div></div>');
						}
					} else {
						marketList.push(e);
						if(e.address!="NA"&&e.image!="NA") {
							$('#markets').append('<div id="'+e.name.replace(/[\s&'!-#()]/g,'').toLowerCase()+'" class="event" data-source="'+e.gps+'"><div class="eImg" style="background-image: url('+e.image+')"></div><div class="eMid"><h2>'+e.name+'</h2><div class="eBody">'+e.frequency+'<br>'+e.address.replace(', ','</br>')+'<br><a href="'+e.website+'">Website</a><div class="eSocial"><a href="'+e.facebook+'"><img src="/images/facebook.png"></a><a href="'+e.instagram+'"><img src="/images/instagram.png"></a></div><div class="eRight"></div></div>');
						}
					}
					if(i==0) {
						$('#map iframe').attr('src',map+e.gps.replace(', ','%2C')+'&z=11');
					}
					console.log(e)
				});
				//
				$('.event').click(function() {
					$('#map iframe').attr('src',map+$(this).attr('data-source').replace(', ','%2C')+'&z=11');
				})
			});
		});
	})
}
