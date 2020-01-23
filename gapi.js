function sendEvent(category,action,label) {
	gtag('event', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label
	});
	console.log(category,action,label);
}
