import { getHtmlFromString } from '@/utils';

class List {
	constructor(onChoose = () => {}) {
		this.el = this.generateListWrapper();
		this.onChoose = onChoose;
	}

	getDom() {
		return this.el;
	}

	renderList(value, data) {
		this.el.innerHTML = '';

		const action = (value && data.length) || value ? 'add' : 'remove';
		this.el.parentNode.classList[action]('show');

		if (!data.length && value) {
			this.el.appendChild(this.getEmptyData());
			return;
		}

		data.forEach(text => {
			const listItem = getHtmlFromString(`
				<li class="autocomplete-list-item">${text}</li>
			`);

			listItem.onclick = () => this.onChoose(text);
			this.el.appendChild(listItem);
		});
	}

	getEmptyData() {
		return getHtmlFromString(`
			<li class="no-data-list">No data</li>
		`);
	}

	generateListWrapper() {
		return getHtmlFromString(`
			<ul class="autocomplete-list"></ul>
		`);
	}
}

export default List;
