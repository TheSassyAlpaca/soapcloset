$(function() {
	//are there variables in url???
	pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
	pName=location.href.substring(location.href.indexOf('/product/')+9,end(location.href,'?'));
	console.log(pName);
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				console.log(entry);
				console.log(entry.gsx$proname.$t);
				if(entry.gsx$proname.$t===pName) {
					buildPage(entry);
				}
			});
			//dataPulls("getSongs");
		});
	});
})

function end(x,y) {
	end=x.length;
	if(x.indexOf(y)!=-1) {
		end=x.indexOf(y);
	}
	return end
}

function buildPage(x) {
	c=$('#content');
	c.append('<h1>'+x.gsx$productname.$t+'</h1><br>');
	c.append('<span>'+x.gsx$traits.$t+'</span>');
	c.append(buildSlide(x.gsx$photos.$t));
	c.append('<h2>$'+x.gsx$price.$t.substring(0,end(x.gsx$price.$t,','))+' per '+x.gsx$size.$t+'</h2><br>');
	c.append('<h2>Bulk Rates:</h2><br><span>'+presentBulk(x.gsx$size.$t)+'</span>');
	c.append('<div>'+x.gsx$description.$t+'</div><br>');
	c.append('<div>'+buildIngredients(x.gsx$ingredients.$t)+'</div><br>');
	
	
	//name - h1
	//traits, listed
	//images - parse and create no-time slide show
	//price - size
	//remaining prices
	//description
	//ingredients - parse list of ingredients and create tooltips for each ingredient
	
	//bundles - this gets pulled from elsewhere
	//frequently bought with - pulled from elsewhere
	
	
	//articles - list of hosted articles related to this product
	
}

function buildSlide(x) {
	
}

function presentBulk(x) {
	
}

function buildIngredients(x) {
	
}

