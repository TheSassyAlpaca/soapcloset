//onload set event to Sign In button for loggin in modal
//onload check if user is logged in and hide Sign In button
//on sign in hide Sign In Button and show userCart


function createOrFindUser(id,auth,type) {
	//what is there to create?
	$('#userLog').css('display','none');
	$('#userCart').css('display','block');
	/*
	if(type=='facebook') {
		console.log(curl -X GET 'https://graph.facebook.com/'+id+'?fields=first_name,last_name,profile_pic,email&access_token='+auth);

	}
	*/
	url='https://graph.facebook.com/'+id+'?fields=email,first_name,last_name,profile_pic&access_token='+auth;
	FB.api(url, function(response) {
		if(response){
			console.log(response);
			//console.error(err);
			
			//get first name, last name, email, photo
			
		} else{
			console.log(response);//Do some stuff with the data object
		}
		console.log(response.error);
	});
}

function endUser(type) {
	$('#userLog').css('display','block');
	$('#userCart').css('display','none');
}
