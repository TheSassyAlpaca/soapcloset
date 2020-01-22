function createOrFindUser(id,auth,type) {
	$('#userLog').css('display','none');
	$('#userCart').css('display','block');
	url='https://graph.facebook.com/'+id+'?fields=email&access_token='+auth;
	FB.api(url, function(response) {
		if(response.error){
			console.error(response.error);
		} else {
			checkUser(id,type,response.email);
		}
	});
}

function checkUser(id,type,email) {
	fKey='https://docs.google.com/forms/d/e/1FAIpQLScKaphtjTSpy9IQdGn-nSn0V1KESVQB1bzh4znvFIh8S8MBGA/formResponse?usp=pp_url&entry.576123776=';
	d='&entry.1859584535=';
	sKey='1HU9HRvsXy-gvmMwvYoHNkP1olvloFdkH5bfKwOZDdsQ';
	sSheet=3;
	checker=0;
	window['account']={};
	$(function() {
		$.getJSON("https://spreadsheets.google.com/feeds/list/"+sKey+"/"+sSheet+"/public/values?alt=json-in-script&callback=?",
		function (data) {
			$.each(data.feed.entry, function(i,entry) {
				if(entry.gsx$id.$t==id) {
					account=JSON.parse(entry.gsx$data.$t);
					if(entry.gsx$data.$t.indexOf('"subscribe":"'+email)!=-1) {
						checker++;
					}
				}
			});
			console.log(account);
			if(jQuery.isEmptyObject(account)) {
				console.log('add user');
				subscribe='';
				if(checker!=0) {
					subscribe=email;
				}
				address={};
				updateUser(account,id,type,email,subscribe);
			}
			console.log(checker);
			if(checker===0) {
				$('#subscribe').prev().children('input').val(email).attr('name',id);
			}
			if(checker!==0) {
				$('#subscribe').parent().prev('span').text('Thank You for Subscribing!');
				$('#subscribe').parent().remove();
			}
		});
	});
}

function updateUser(current,id,type,email,subscribe,address,favorite,wish,cart,order) {
	console.log(current,id,type,email,subscribe,address,favorite,wish,cart,order);
	updatedUser=account;
	changes=0;
	changed=[];
	if(id!=undefined&&id!=null) {
		updatedUser.id=id;
		changes++;
		changed.push('id');
	}
	if(type!=undefined&&type!=null) {
		updatedUser.type=type;
		changes++;
		changed.push('type');
	}
	if(email!=undefined&&email!=null) {
		updatedUser.email=email;
		changes++;
		changed.push('email');
	}
	if(subscribe!=undefined&&subscribe!=null) {
		updatedUser.subscribe=subscribe;
		changes++;
		changed.push('subscribe');
	}
	if(!jQuery.isEmptyObject(address)&&(updatedUser.addresses!=undefined||updatedUser.addresses!=[])&&address!=null) {
		addFinder=0;
		for(i=0;i<updatedUser.addresses.length;i++) {
			if(updatedUser.addresses[i].id==address.id) {
				addFinder++;
				updatedUser.addresses[i]=address;
			}
		}
		if(addFinder==0) {
			updatedUser.addresses.push(address);
		}
		changes++;
		changed.push('addresses');
	} else {
		updatedUser.addresses=[];
		updatedUser.addresses.push(address);
		changes++;
		changed.push('addresses');
	}
	favHolder=[];
	favCheck=0;
	if(updatedUser.favorites) {
		for(i=0;i<updatedUser.favorites.length;i++) {
			if(updatedUser.favorites[i]!=favorite) {
				favHolder.push(updatedUser.favorites[i]);
			} else {
				favCheck++;
				changes++;
				changed.push('favorite');
			}
		}
	}
	if(favCheck==0) {
		favHolder.push(favorite);
		changes++;
		changed.push('favorite');
	}
	updatedUser.favorites=favHolder;
	wishHolder=[];
	wishCheck=0;
	if(updatedUser.wishes) {
		for(i=0;i<updatedUser.wishes.length;i++) {
			if(updatedUser.wishes[i]!=wish) {
				wishHolder.push(updatedUser.wishes[i]);
			} else {
				wishCheck++;
				changes++;
				changed.push('wish');
			}
		}
	}
	if(wishCheck==0) {
		wishHolder.push(wish);
		changes++;
		changed.push('wish');
	}
	updatedUser.wishes=wishHolder;
	if(cart!=undefined&&cart!=null) {
		updatedUser.cart=cart;
		changes++;
		changed.push('cart');
	}
	orderHolder=[];
	orderCheck=0;
	if(updatedUser.orders) {
		for(i=0;i<updatedUser.orders.length;i++) {
			if(updatedUser.orders[i]!=order) {
				orderHolder.push(updatedUser.orders[i]);
			} else {
				orderCheck++;
				changes++;
				changed.push('order');
			}
		}
	}
	if(orderCheck==0) {
		orderHolder.push(order);
		changes++;
		changed.push('order');
	}
	updatedUser.orders=orderHolder;
	console.log(changes);
	//return updatedUser
	account=updatedUser;
	console.log(account);
	console.log(fKey+id+d+JSON.stringify(account));
	$('#basement').append('<iframe src="'+fKey+account.id+d+encodeURIComponent(JSON.stringify(account))+'">');
	sendEventsendEvent('update user info','changed',changed,changes);
}

function endUser(type) {
	$('#userLog').css('display','block');
	$('#userCart').css('display','none');
}
