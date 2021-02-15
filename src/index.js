import Autocomplete from '@/modules/Autocomplete';
import './scss/index.scss';

new Autocomplete({
	root: '#autocomplete',
	data: {
		url: '/testdata.json',
		// list: ['test', 'web', 'java', 'javascript', 'ruby', 'php'],
	},
	onChoose(value) {
		console.log(value);
	}
});
