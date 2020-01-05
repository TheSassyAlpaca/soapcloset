$(function() {
	//are there variables in url???
	pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
	pName=location.href.substring(location.href.indexOf('/product/')+9,endString(location.href,'#'));
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/1/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				if(entry.gsx$proname.$t===pName) {
					buildPage(entry);
				}
			});
			//dataPulls("getSongs");
		});
	});
})

function buildPage(x) {
	c=$('#content');
	c.append('<h1>'+x.gsx$productname.$t+'</h1>');
	c.append('<span>'+x.gsx$traits.$t+'</span>');
	c.append('<div id="slideContainer">'+buildSlide(x.gsx$photos.$t)+'</div>');
	mechanizeSlide(x.gsx$photos.$t);
	$('#slideContainer').append('<div id="shareBox"></div>');
	buildShare();
	c.append('<div id="priceBox">$'+x.gsx$price.$t.substring(0,endString(x.gsx$price.$t,','))+' <div><span>per </span><span>'+x.gsx$size.$t+'</span></div></div>');
	if(x.gsx$price.$t.indexOf(',')!=-1) {
		c.append('<h2><div></div>Bulk Rates</h2><div>'+presentBulk(x.gsx$price.$t)+'</div>');
		$('h2 > div').click(function() {
			$(this).toggleClass('engage');
			if($(this).hasClass('engage')) {
				$(this).parent().next('div').addClass('expand');
			} else {
				$(this).parent().next('div').removeClass('expand');
			}
		})
	}
	c.append('<div>'+x.gsx$description.$t+'</div>');
	if(x.gsx$var.$t==='NA') {
		c.append('<div id="ingredients"><h2>Ingredients</h2>'+buildIngredients(x.gsx$ingredients.$t)+'</div>');
		$('#ingredients .ingredient').click(function() {
			ingredientName=$(this).text().replace(/[\s()%]+/g,'').toLowerCase();
		})
		updateHash();
	} else {
		c.append('<div id="ingredients"><h2>Ingredients</h2></div>');
		buildVars(x.gsx$var.$t,x.gsx$ingredients.$t);
	}
	c.append('<div id="'+x.gsx$proname.$t+'" class="counter"><div class="down">-</div><input type="number" value="1" min="0"><div class="up">+</div></div>');
	$('#'+x.gsx$proname.$t).children('div').click(function() {
		if($(this).hasClass('down')) {
			if($('#'+x.gsx$proname.$t).children('input').val()>0) {
				$('#'+x.gsx$proname.$t).children('input').val(Number($('#'+x.gsx$proname.$t).children('input').val())-1);
			}
		}
		if($(this).hasClass('up')) {
			$('#'+x.gsx$proname.$t).children('input').val(Number($('#'+x.gsx$proname.$t).children('input').val())+1);
		}
	})
	c.append('<div id="purchase">Update Cart</div>');
	$('#purchase').click(function() {
		//$('#'+x.gsx$proname.$t).children('input').val();
		console.log('product','Replace',window.location.hash.substring(1,window.location.hash.length)+'+'+$('#'+x.gsx$proname.$t).children('input').val(),2592000000);
		updateCookie('product','Replace',window.location.hash.substring(1,window.location.hash.length)+'+'+$('#'+x.gsx$proname.$t).children('input').val(),2592000000);
		userAlert("Updated cart: "+$('#content').find('h1').text()+" "+$('#'+x.gsx$proname.$t).children('input').val()+".");
	})
	
	//bundles - this gets pulled from elsewhere
	//frequently bought with - pulled from elsewhere
	//articles - list of hosted articles related to this product
}

function buildShare() {
	s=$('#shareBox');
	//sm=.id/.link.icon
	s.append('<img src="/images/share.png">')
	for(i=0;i<sm.length;i++) {
		if(sm[i].share) {
			s.append('<div class="shareButton" data-content="'+sm[i].share+'"><img src="'+sm[i].icon+'"></div>')
		}
	}
	s.click(function() {
		$(this).toggleClass('engage');
	})
	s.children('.shareButton').click(function() {
		//do stuff
		window.open($(this).attr('data-content')+encodeURIComponent(location.href));
	})
}

function updateHash() {
	pName=location.href.substring(location.href.indexOf('/product/')+9,endString(location.href,'#'));
	hash=pName+'_';
	$('#ingredients').children('h3').each(function() {
		array=window[$(this).attr('id')];
		variable=$(this).attr('data-content').substring(3,$(this).attr('data-content').length);
		for(i=1;i<array.length;i++) {
			if(array[i].name==variable) {
				hash=hash+$(this).attr('id')+'-'+array[i].id+'|';
			}
		}
	})
	window.location.hash=hash;
}

function endString(x,y) {
	end=x.length;
	if(x.indexOf(y)!=-1) {
		end=x.indexOf(y);
	}
	return end
}

function buildVars(x,y) {
	x=x.split(',');
	variables=x;
	for(i=0;i<x.length;i++) {
		window[x[i]]=[];
	}
	pKey="1qu4IlBEElSjAsX0E6ZetEQxL16BuMdjrb-l3EoU21iU";
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + pKey + "/2/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				if(x.indexOf(entry.gsx$var.$t)!==-1) {
					if(window[entry.gsx$var.$t].length===0) {
						window[entry.gsx$var.$t].push(entry.gsx$varname.$t);
					}
					obj='{"id":"'+entry.gsx$id.$t+'","name":"'+entry.gsx$name.$t+'","ingredients":"'+entry.gsx$ingredients.$t+'"}';
					window[entry.gsx$var.$t].push(JSON.parse('{"id":"'+entry.gsx$id.$t+'","name":"'+entry.gsx$name.$t+'","ingredients":"'+entry.gsx$ingredients.$t+'"}'));
				}
			});
			ySplit=y.split('=');
			baseVariables=ySplit[1].split('|');
			for(k=0;k<baseVariables.length;k++) {
				vSet=baseVariables[k].split('-');
				buildVariableIngredients(vSet)
			}
			//console.log(Oils[1].id);
		});
	});
}

function showTooltip() {
	//collect content
	//layout content
	//position content
	//allow for content to be closed
}

function buildVariableIngredients(y) {
	w=window[y[0]][y[1]];
	o=window[y[0]];
	x=w.ingredients.split(', ');
	ingType='<h3 id="'+y[0]+'"><div></div>'+window[y[0]][0]+'</h3>';
	ingOptions='<div>';
	for(i=1;i<o.length;i++) {
		ingOptions=ingOptions+'<div class="ingOptions" name="'+o[i].id+'">'+o[i].name+'</div>';
	}
	ingOptions=ingOptions+'</div>';
	ing='<div>';
	for(i=0;i<x.length;i++) {
		ing=ing+'<span class="ingredient">'+x[i]+'</span>';
		if(i!=x.length-1) {
			ing=ing+', ';
		}
	}
	if($('#'+y[0]).length) {
		$('#'+y[0]).attr('data-content',' - '+window[y[0]][y[1]].name);
		$('#'+y[0]).next().next().replaceWith(ing);
		$('#'+y[0]).next().children('div.ingOptions').each(function() {
			if($(this).attr('name')==y[1].toString()) {
				$(this).addClass('selected');
			} else {
				$(this).removeClass('selected');
			}
		})
	} else {
		$('#ingredients').append(ingType+ingOptions+ing);
		$('#'+y[0]).attr('data-content',' - '+window[y[0]][y[1]].name);
		$('#'+y[0]).next().children('div.ingOptions').each(function() {
			if($(this).attr('name')==y[1].toString()) {
				$(this).addClass('selected');
			} else {
				$(this).removeClass('selected');
			}
		})
		$('#'+y[0]+' > div').click(function() {
			$(this).toggleClass('engage');
			if($(this).hasClass('engage')) {
				$(this).parent().next('div').addClass('expand');
			} else {
				$(this).parent().next('div').removeClass('expand');
			}
		})
		$('#'+y[0]).next().children('div.ingOptions').click(function() {
			replace=[y[0],Number($(this).attr('name'))];
			$(this).parent().prev('h3').children('div').removeClass('engage');
			$(this).parent().removeClass('expand');
			buildVariableIngredients(replace);
		})
	}
	$('#'+y[0]).next().next('div').children('span.ingredient').click(function() {
		ingredientName=$(this).text().replace(/[\s()%]+/g,'').toLowerCase();
		showTooltip(ingredientName);
	})
	updateHash();
}

function buildIngredients(x) {
	x=x.split(', ');
	ing='<div class="exception">';
	for(i=0;i<x.length;i++) {
		ing=ing+'<span class="ingredient">'+x[i]+'</span>';
		if(i!=x.length-1) {
			ing=ing+', ';
		}
	}
	ing=ing+'</div>';
	return ing
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

