$(function() {
	//are there variables in url???
	pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
	pName=location.href.substring(location.href.indexOf('/product/')+9,endString(location.href,'?'));
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

function buildPage(x) {
	console.log(endString(x.gsx$price.$t,','));
	c=$('#content');
	c.append('<h1>'+x.gsx$productname.$t+'</h1>');
	c.append('<span>'+x.gsx$traits.$t+'</span>');
	c.append('<div id="slideContainer">'+buildSlide(x.gsx$photos.$t)+'</div>');
	mechanizeSlide(x.gsx$photos.$t);
	c.append('<div id="priceBox">$'+x.gsx$price.$t.substring(0,endString(x.gsx$price.$t,','))+' <div><span>per </span><span>'+x.gsx$size.$t+'</span></div></div>');
	if(x.gsx$price.$t.indexOf(',')!=-1) {
		c.append('<h2>Bulk Rates:</h2><div>'+presentBulk(x.gsx$price.$t)+'</div>');
	}
	c.append('<div>'+x.gsx$description.$t+'</div><br>');
	if(x.gsx$var.$t==='NA') {
		c.append('<div id="ingredients">'+buildIngredients(x.gsx$ingredients.$t)+'</div><br>');
	} else {
		c.append('<div id="ingredients"></div><br>');
		buildVars(x.gsx$var.$t);
		$('#ingredients').append();
	}
	
	
	
	//name - h1
	//traits, listed
	//images - parse and create no-time slide show
	//price - size
	//remaining prices
	//description
	//ingredients - parse list of ingredients and create tooltips for each ingredient
	//THE ABOVE IS DONE
	
	
	//bundles - this gets pulled from elsewhere
	//frequently bought with - pulled from elsewhere
	
	
	//articles - list of hosted articles related to this product
	
}


function endString(x,y) {
	end=x.length;
	if(x.indexOf(y)!=-1) {
		end=x.indexOf(y);
	}
	return end
}

function buildVars(x) {
	x=x.split(',');
	variables=x;
	for(i=0;i<x.length;i++) {
		window[x[i]]=[];
	}
	pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
	console.log(variables);
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/2/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				console.log(entry);
				console.log(entry.gsx$var.$t);
				if(x.indexOf(entry.gsx$var.$t)!==-1) {
					if(window[entry.gsx$var.$t].length===0) {
						window[entry.gsx$var.$t].push(entry.gsx$varname.$t);
					}
					window[entry.gsx$var.$t].push(JSON.parse('{"id"="'+entry.gsx$id.$t+'","name"="'+entry.gsx$name.$t+'","ingredients"="'+entry.gsx$ingredients.$t+'"}'));
				}
			});
			console.log(Oils[1].id);
			console.log(window[x[0]]);
			//dataPulls("getSongs");
		});
	});
}

function buildSlide(x) {
	iURL='/images/products/';
	x=x.split(',');
	container='';
	guide='<div id="slideGuide">';
	for(i=0;i<x.length;i++) {
		container=container+'<div id="slide'+i+'" class="slide" style="background-image:url('+iURL+x[i]+')"></div>';
		guide=guide+'<div id="guide'+i+'"  class="thumb" style="background-image:url('+iURL+x[i]+')"></div>';
	}
	slide=container+guide+'</div>';
	return slide
}

function presentBulk(x) {
	x=x.split(',');
	bulk='';
	for(i=1;i<x.length;i++) {
		set=x[i].split('/');
		price=set[0];
		qty=set[1];
		bulk=bulk+'<span>'+qty+' for $'+price+'</span>';
		if(i<x.length-1) {
			bulk=bulk+'<br>';
		}
	}
	return bulk
}

function buildIngredients(x) {
	x=x.split(', ');
	ing='';
	for(i=0;i<x.length;i++) {
		ing=ing+'<div class="ingredient">'+x[i]+'</div>';
	}
	$('.ingredient').click(function() {
		ingredientName=$(this).text().replace(/[\s()%]+/g,'');
		console.log(ingredientName);
	})
}

function mechanizeSlide(x) {
	s=0;
	g=0;
	$('.slide').each(function() {
		if(s===0) {
			$(this).addClass('active');
		}
		s++;
	})
	$('.thumb').each(function() {
		if(g===0) {
			$(this).addClass('active');
		}
		g++;
	})
	guide='guide';
	$('.thumb').click(function() {
		$('.thumb').each(function() {
			$(this).removeClass('active');
		})
		$(this).addClass('active');
		thisSlide=$('#slide'+$(this).attr('id').substring(guide.length,$(this).attr('id').length));
		$('.slide').each(function() {
			$(this).removeClass('active');
		})
		thisSlide.addClass('active');
	})
}

