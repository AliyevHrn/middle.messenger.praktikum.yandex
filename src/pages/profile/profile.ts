import Block from '../../utils/Block';
import tmpl from './profile.pug';
import compile from '../../utils/compile';
import render from '../../utils/renderDOM';
import formLInk from '../../components/formLInk';
import Authorization from '../authorization';
import changeData from '../changedata';
import changePassword from '../changepassword';

export class Profile extends Block {
	constructor() {
		super('div');
	}

	protected render(): DocumentFragment {


		const changeDataLink = new formLInk({
			text: 'Изменить данные',
			events: {
				click: () => render('.app', new changeData())
			}
		});
		const changePasswordLink = new formLInk({
			text: 'Изменить пароль',
			events: {
				click: () => render('.app', new changePassword())
			}
		});

		const signOut = new formLInk({
			text: 'Выйти',
			events: {
				click: () => render('.app', new Authorization())
			}
		});



		return compile(tmpl, {
			changeDataLink: changeDataLink,
			changePasswordLink: changePasswordLink,
			signOut: signOut
		});
	}
}
