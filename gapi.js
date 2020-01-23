function sendEvent(category,action,label) {
	console.log(category,action,label);
	ga('send', 'event', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label
	});
}
