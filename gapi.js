function sendEvent(category,action,label,value) {
	console.log(category,action,label,value);
	gtag('send', 'event', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label,
		eventValue: value
	});
}
