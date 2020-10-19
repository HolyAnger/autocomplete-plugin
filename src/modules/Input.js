import { getHtmlFromString } from '@/utils';

class Input {
	constructor(options) {
		const { placeholder, onInput = () => {} } = options;

		this.placeholder = placeholder;
		this.el = this.generateInputEl();
		this.el.oninput = onInput;
	}

	setInput(value) {
		this.el.value = value;
	}

	onFocus(callback = () => {}) {
		this.el.onfocus = callback;
	}

	getDom() {
		return this.el;
	}

	generateInputEl() {
		return getHtmlFromString(`
			<input type="text" placeholder="${this.placeholder}" class="input-el">
		`);
	}
}

export default Input;
