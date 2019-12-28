pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";

$(function() {
	//get product name from url
	//are there variables in url???
	pName=location.href.substring(location.href.indexOf('/product/')+8,location.href.indexOf('?'))
	console.log(pName);
	
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				console.log(entry);
				console.log(entry.gsx$proname.$t);
				//thisEntry=JSON.parse(entry.gsx$data.$t.replace(/'/g,"\""));
				
				/*
				if(checkSongs.indexOf(thisEntry.songID)==-1) {
					checkSongs.push(thisEntry.songID);
					window[s].push(thisEntry);
				} else {
					window[s][checkSongs.indexOf(thisEntry.songID)]=thisEntry;
				}*/
			});
			//dataPulls("getSongs");
		});
	});
})
