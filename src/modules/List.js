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

		data.forEach(dataValue => {
			const valueObj = this.getValuesFromData(dataValue);
			let img = null;
			let label = null;
			let value = null;

			if (typeof valueObj === 'string') {
				label = valueObj;
				value = valueObj.toLowerCase();
			} else {
				img = valueObj.img;
				label = valueObj.label;
				value = valueObj.value;
			}

			const imgEl = img ? `<img src="${img}" alt=""/>` : '';

			const listItem = getHtmlFromString(`
				<li class="autocomplete-list-item">
					${imgEl}
					<span>${label}</span>
				</li>
			`);

			listItem.onclick = () => this.onChoose(value);
			this.el.appendChild(listItem);
		});
	}

	getValuesFromData(data) {
		if (typeof data === 'string') {
			return data;
		}

		const { value, img, label } = data;

		return {
			value,
			img,
			label,
		};
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
