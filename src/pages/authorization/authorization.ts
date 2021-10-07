import Block from '../../utils/Block';
import tmpl from './authorization.pug';
import Button from '../../components/button';
import Input from '../../components/input';
import compile from '../../utils/compile';
import FormValidate from '../../utils/formValidate';
import FormData from '../../utils/getFormData';
import render from '../../utils/renderDOM';
import Registration from '../registration';
import formLInk from '../../components/formLInk';
import Profile from '../profile';

export class Authorization extends Block {
	constructor() {
		super('div');
	}

	protected render(): DocumentFragment {


		const linkToRegistration = new formLInk({
			text: 'Еще не зарегистрированы?',
			events: {
				click: () => render('.app', new Registration())
			}
		});

		const profileLink = new formLInk({
			text: 'Перейти в профиль',
			events: {
				click: () => render('.app', new Profile())
			}
		});


		const button = new Button({
			text: 'Войти',
			events: {
				click: () => {
					new FormData();
					new FormValidate();
				}
			}
		});

		const inputLogin = new Input({
			type: 'text',
			name: 'login',
			id: 'login',
			labelName: 'Логин',
			events: {
				click: (e) => {
					console.log(this._element);
					e.target.classList.add('focus');
				},
				focus: (e) => e.target.classList.add('focus'),
				blur: () => console.log('blur')
			}
		});

		const inputPassword = new Input({
			type: 'password',
			name: 'password',
			id: 'password',
			labelName: 'Пароль',
			events: {
				click: (e) => e.target.classList.add('focus'),
				focus: (e) => e.target.classList.add('focus'),
				blur: () => new FormValidate()
			}
		});


		return compile(tmpl, {
			button: button,
			linkToRegistration: linkToRegistration,
			profileLink: profileLink,
			inputLogin: inputLogin,
			inputPassword: inputPassword
		});
	}
}
