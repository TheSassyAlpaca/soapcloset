//onload set event to Sign In button for loggin in modal
//onload check if user is logged in and hide Sign In button
//on sign in hide Sign In Button and show userCart


function createOrFindUser(id,type) {
	//what is there to create?
	$('#userLog').css('display','none');
	$('#userCart').css('display','block');
}

function endUser(type) {
	$('#userLog').css('display','block');
	$('#userCart').css('display','none');
}
