pKey2="2PACX-1vR80HM2qiXn6CLcIpPrIbLFd_4YZ2g9dLRR9Xo54pa8iQG6S7AW-1LjuHvdVGqdzDHBJift-I30Jnzv";
pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";


function getProduct(x,y) {
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + x + "/" + y + "/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				console.log(entry);
				console.log(entry.gsx$pro_name.$t);
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
}

$(function() {
  getProduct(pKey,1);
})
