function sendEvent(category,action,label,value) {
	ga('send', 'event', {
		eventCategory: category,
		eventAction: action,
		eventLabel: label,
		eventValue: value
	});
}
