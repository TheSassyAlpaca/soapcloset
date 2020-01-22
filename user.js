function createOrFindUser(id,auth,type) {
	$('#userLog').css('display','none');
	$('#userCart').css('display','block');
	url='https://graph.facebook.com/'+id+'?fields=email&access_token='+auth;
	FB.api(url, function(response) {
		if(response.error){
			console.error(response.error);
		} else {
			checkUser(id,type,response.email);
			//checkSubscriber(id,type,response.email);
		}
	});
}

function checkUser(id,type,email) {
	fKey='https://docs.google.com/forms/d/e/1FAIpQLScKaphtjTSpy9IQdGn-nSn0V1KESVQB1bzh4znvFIh8S8MBGA/formResponse?usp=pp_url&entry.576123776=';
	d='&entry.1859584535=';
	sKey='1HU9HRvsXy-gvmMwvYoHNkP1olvloFdkH5bfKwOZDdsQ';
	sSheet=3;
	checker=0;
	window['found']={};
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/"+sKey+"/"+sSheet+"/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				if(entry.gsx$id.$t==id) {
					found=JSON.parse(entry.gsx$data.$t);
					if(entry.gsx$data.$t.indexOf('"subscribe":"'+email)!=-1) {
						checker++;
					}
				}
			});
			console.log(found);
			if(found===undefined) {
				console.log('add user');
				subscribe='';
				if(checker!=0) {
					subscribe=email;
				}
				address={};
				user=updateUser(id,type,email,subscribe,address);
				newUser=fKey+id+d+JSON.stringify(user);
			} else {
				//save user data as object
			}
			console.log(checker);
			if(checker===0) {
				$('#subscribe').prev().children('input').val(email).attr('name',id);
			}
			if(checker!==0) {
				//change subscription field
				$('#subscribe').parent().prev('span').text('Thank You for Subscribing!');
				$('#subscribe').parent().remove();
			}
			//console.log(Oils[1].id);
		});
	});
}

function updateUser(id,type,email,subscribe,address) {
	updatedUser={};
	if(id!=undefined) {
		updatedUser.id=id;
	}
	if(type!=undefined) {
		updatedUser.data.type=type;
	}
	if(email!=undefined||email!=updatedUser.data.email) {
		updatedUser.data.email=email;
	}
	if(subscribe!=undefined||subscribe!=updatedUser.data.subscribe) {
		updatedUser.data.subscribe=subscribe;
	}
	if(address!={}) {
		addFinder=0;
		for(i=0;i<updatedUser.data.addresses.length;i++) {
			if(updatedUser.data.addresses[i].id==address.id) {
				addFinder++;
				updatedUser.data.addresses[i]=address;
			}
		}
		if(addFinder==0) {
			updatedUser.data.addresses.push(address);
		}
	}
	return updatedUser
}

function endUser(type) {
	$('#userLog').css('display','block');
	$('#userCart').css('display','none');
}

/*
function checkSubscriber(id,type,email) {
	sKey='17tAZ9gxLCcj0A1xHOqim2qYlJHwzXFOl6ziDV2rtdAc';
	checker=0;
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/" + sKey + "/1/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				if(entry.gsx$id.$t==id&&entry.gsx$email.$t==email) {
					checker++;
				}
			});
			console.log(checker);
			if(checker===0) {
				$('#subscribe').prev().children('input').val(email).attr('name',id);
			}
			if(checker!==0) {
				//change subscription field
				$('#subscribe').parent().prev('span').text('Thank You for Subscribing!');
				$('#subscribe').parent().remove();
			}
			//console.log(Oils[1].id);
		});
	});
}
*/
