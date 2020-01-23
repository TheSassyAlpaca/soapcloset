function sendEvent(category,action,label) {
	ga('event', 'click', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label
	});
	ga('event', 'click',category,action,label);
	console.log(category,action,label);
}
