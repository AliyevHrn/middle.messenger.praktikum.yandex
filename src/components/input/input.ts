import Block from '../../utils/Block';
import tmpl from './input.pug';
import compile from '../../utils/compile';

export class Input extends Block {
	constructor(props: {
			type: string;
      name: string;
      id: string;
      labelName: string;
			events?: {
				click?: (e?:any) => void;
				focus?: (e?:any) => void;
        blur?: (e?:any) => void;
			};
		}) {
		// Создаём враппер DOM-элемент button
		super('div', props);
	}

	render() {
		return compile(tmpl, {...this.props});
	}
}
