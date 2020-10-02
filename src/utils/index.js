export const getDomBySelector = (selector) => {
	const selectorType = selector.charAt(0);
	const query = selectorType === '#' ?
		'getElementById' : selectorType === '.' ? 'querySelector' : null;

	if (!query) {
		throw new Error('Not valid selector');
	}

	const domEl = document[query](selector.slice(1, selector.length));

	if (!domEl) {
		throw new Error('Dom el not exist');
	}

	return domEl;
};

export const getHtmlFromString = (str) => {
	const div = document.createElement('div');
	div.innerHTML = str;
	return div.children[0];
};

