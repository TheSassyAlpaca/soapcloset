function sendEvent(category,label) {
	gtag('event', 'click', {
		eventCategory: category,
		eventLabel: label
	});
	console.log(category,label);
}
