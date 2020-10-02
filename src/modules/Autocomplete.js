import { getDomBySelector, getHtmlFromString } from '@/utils';
import Input from '@/modules/Input';

class Autocomplete {
	constructor(options = {}) {
		this.defaultOptions = {
			placeholder: 'Write something'
		};

		this.options = {...this.defaultOptions, ...options};
		this.requiredOptions = ['root'];

		this.checkRequiredOptionsAndInit();
	}

	init() {
		const { root } = this.options;
		this.createAutocompleteHtml(getDomBySelector(root));
	}

	onInput(e) {
		console.log(e.target.value);
	}

	createAutocompleteHtml(domEl) {
		const parentDomEl = domEl.parentNode;
		const keysToAppend = ['input'];

		this.input = new Input(this.options.placeholder);

		const html = getHtmlFromString(`
			<div class="autocomplete-wrapper">
				<div class="input-wrapper" data-ui="input"></div>
			</div>		
		`);

		keysToAppend.forEach(key => {
			const wrapper = html.querySelector(`[data-ui=${key}]`);
			wrapper.removeAttribute('data-ui');
			wrapper.appendChild(this[key]);
		});

		this.input.oninput = this.onInput;

		parentDomEl.replaceChild(html, domEl);
	}

	checkRequiredOptionsAndInit() {
		this.requiredOptions.forEach(key => {
			const optionKeys = Object.keys(this.options);
			if (optionKeys.includes(key)) {
				return;
			}

			throw new Error(`${key} key is required`);
		});

		this.init();
	}
}

export default Autocomplete;
