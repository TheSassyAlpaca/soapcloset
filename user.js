function createOrFindUser(id,auth,type) {
	$('#userLog').css('display','none');
	$('#userCart').css('display','block');
	url='https://graph.facebook.com/'+id+'?fields=email&access_token='+auth;
	FB.api(url, function(response) {
		if(response.error){
			console.error(response.error);
		} else {
			console.log(response);
			console.log(response.email);
			//function to check if email and id are attached
			checkSubscriber(id,type,response.email);
		}
	});
	//user account page
	//url='https://graph.facebook.com/'+id+'?fields=email,first_name,last_name,picture&access_token='+auth;
	//console.log(response.picture.data.url);
}

function endUser(type) {
	$('#userLog').css('display','block');
	$('#userCart').css('display','none');
}

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
			if(checker===0) {
				$('#subscribe').prev().children('input').val(email).attr('name',id);
			}
			if(checker!==0) {
				//change subscription field
			}
			//console.log(Oils[1].id);
		});
	});
}
