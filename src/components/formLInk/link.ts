import Block from '../../utils/Block';
import tmpl from './link.pug';
import compile from '../../utils/compile';

export class formLink extends Block {
	constructor(props: {
			text: string;
			events?: {
				click: () => void
			};
		}) {
		// Создаём враппер DOM-элемент div
		super('div', props);
	}

	render() {
		return compile(tmpl, {...this.props});
	}
}
