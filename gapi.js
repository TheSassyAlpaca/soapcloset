function sendEvent(category,action,label) {
	ga('event', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label
	});
	console.log(category,action,label);
}
