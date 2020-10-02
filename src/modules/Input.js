import { getHtmlFromString } from '@/utils';

class Input {
	constructor(placeholder) {
		this.placeholder = placeholder;

		return this.getInputEl();
	}

	getInputEl() {
		return getHtmlFromString(`
			<input type="text" placeholder="${this.placeholder}">
		`);
	}
}

export default Input;
