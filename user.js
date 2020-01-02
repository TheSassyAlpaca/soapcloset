//onload set event to Sign In button for loggin in modal
//onload check if user is logged in and hide Sign In button
//on sign in hide Sign In Button and show userCart


function createOrFindUser(id,auth,type) {
	//what is there to create?
	$('#userLog').css('display','none');
	$('#userCart').css('display','block');
	if(type=='facebook') {
		console.log(curl -X GET 'https://graph.facebook.com/'+id+'?fields=first_name,last_name,profile_pic,email&access_token='+auth);

	}
}

function endUser(type) {
	$('#userLog').css('display','block');
	$('#userCart').css('display','none');
}
