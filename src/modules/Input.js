import { getHtmlFromString } from '@/utils';

class Input {
	constructor(placeholder, onInput = () => {}) {
		this.placeholder = placeholder;
		this.el = this.generateInputEl();
		this.el.oninput = onInput;
	}

	getDom() {
		return this.el;
	}

	generateInputEl() {
		return getHtmlFromString(`
			<input type="text" placeholder="${this.placeholder}">
		`);
	}
}

export default Input;
