function sendEvent(category,action,label) {
	console.log(category,action,label);
	gtag('send', 'event', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label
	});
}
