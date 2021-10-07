import Block from '../../utils/Block';
import tmpl from './changedata.pug';
import compile from '../../utils/compile';
// import render from '../../utils/renderDOM';
import Button from '../../components/button';
// import Profile from '../profile';
import FormValidate from '../../utils/formValidate';
import FormData from '../../utils/getFormData';

export class ChangeData extends Block {
	constructor() {
		super('div');
	}

	protected render(): DocumentFragment {

		const button = new Button({
			text: 'Сохранить',
			events: {
				click: () => {
					new FormData();
					new FormValidate();
				}
			}
		});

		return compile(tmpl, {
			button: button,
		});
	}
}
