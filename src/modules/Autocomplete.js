import { getDomBySelector, getHtmlFromString } from '@/utils';
import Input from '@/modules/Input';
import List from '@/modules/List';

class Autocomplete {
	constructor(options = {}) {
		this.defaultOptions = {
			placeholder: 'Write something',
			noDataMsg: 'No Data',
			onChoose: () => {},
		};

		this.options = {...this.defaultOptions, ...options};
		this.requiredOptions = ['root', 'data'];

		this.checkRequiredOptionsAndInit();
	}

	init() {
		const { root } = this.options;
		this.createAutocompleteHtml(getDomBySelector(root));
	}

	getInput() {
		return this.input.el;
	}

	getList() {
		return this.list.el;
	}

	onInput(e) {
		const value = e.target.value.trim().toLowerCase();
		const { data } = this.options;
		const { list } = data;

		const acData = value ?
			list.filter(valueList => {
				if (typeof valueList === 'string') {
					return valueList.toLowerCase().includes(value);
				}

				return valueList.label.toLowerCase().includes(value);
			}) :
			[];

		this.list.renderList(value, acData);
	}

	onChooseItem(value, label) {
		this.input.setInput(label);
		this.options.onChoose(value);
	}

	createAutocompleteHtml(domEl) {
		const parentDomEl = domEl.parentNode;
		const keysToAppend = ['input', 'list'];

		const { placeholder, noDataMsg } = this.options;

		this.input = new Input({
			placeholder,
			onInput: this.onInput.bind(this),
		});

		this.list = new List({
			noDataMsg,
			onChoose: this.onChooseItem.bind(this),
		});

		this.input.onFocus(() => this.list.toggleVisibility(true));

		const html = getHtmlFromString(`
			<div class="autocomplete-wrapper">
				<div class="input-wrapper" data-ui="input"></div>
				<div class="autocomplete-list-wrapper" data-ui="list"></div>
			</div>
		`);

		keysToAppend.forEach(key => {
			const wrapper = html.querySelector(`[data-ui=${key}]`);
			wrapper.removeAttribute('data-ui');
			wrapper.appendChild(this[key].getDom());
		});

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
