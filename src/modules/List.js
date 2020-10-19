import { getHtmlFromString } from '@/utils';

class List {
	constructor(options) {
		const { onChoose = () => {}, noDataMsg } = options;
		this.el = this.generateListWrapper();
		this.noDataMsg = noDataMsg;
		this.onChoose = onChoose;
	}

	getDom() {
		return this.el;
	}

	toggleVisibility(visible) {
		this.el.classList[visible ? 'add' : 'remove']('show');
	}

	renderList(value, data) {
		this.el.innerHTML = '';

		const action = (value && data.length) || value ? 'add' : 'remove';
		this.toggleVisibility(action);

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
				label = valueObj.charAt(0).toUpperCase() +
					valueObj.slice(1, valueObj.length);

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

			listItem.onclick = () => {
				this.toggleVisibility(false);
				this.onChoose(value, label);
			};
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
			<li class="no-data-list">${this.noDataMsg}</li>
		`);
	}

	generateListWrapper() {
		return getHtmlFromString(`
			<ul class="autocomplete-list"></ul>
		`);
	}
}

export default List;
