function sendEvent(category,action,label) {
	gtag('event', action, {
		eventCategory: category,
		eventLabel: label
	});
}
