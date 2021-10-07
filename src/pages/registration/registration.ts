import Block from '../../utils/Block';
import tmpl from './registration.pug';
import Button from '../../components/button';
import Input from '../../components/input';
import compile from '../../utils/compile';
import FormValidate from '../../utils/formValidate';
import FormData from '../../utils/getFormData';
import render from '../../utils/renderDOM';
import Authorization from '../authorization';
import formLInk from '../../components/formLInk';

export class Registration extends Block {
	constructor() {
		super('div');
	}

	protected render(): DocumentFragment {

		const button = new Button({
			text: 'Зарегистрироваться',
			events: {
				click: () => {
					new FormData();
					new FormValidate();
				}
			}
		});

		const linkToAuthorization = new formLInk({
			text: 'Войти',
			events: {
				click: () => render('.app', new Authorization())
			}
		});


		const inputEmail = new Input({
			type: 'email',
			name: 'email',
			id: 'email',
			labelName: 'Почта',
			events: {
				click: (e) => e.target.classList.add('focus'),
				focus: (e) => e.target.classList.add('focus'),
				blur: () => console.log('blur'),
			}
		});

		const inputLogin = new Input({
			type: 'text',
			name: 'login',
			id: 'login',
			labelName: 'Логин',
			events: {
				click: (e) => e.target.classList.add('focus'),
				focus: (e) => e.target.classList.add('focus'),
				blur: () => console.log('blur')
			}
		});

		const inputFirstName = new Input({
			type: 'text',
			name: 'first_name',
			id: 'first_name',
			labelName: 'Имя',
			events: {
				click: (e) => e.target.classList.add('focus'),
				focus: (e) => e.target.classList.add('focus'),
				blur: () => console.log('blur')
			}
		});

		const inputSecondName = new Input({
			type: 'text',
			name: 'second_name',
			id: 'second_name',
			labelName: 'Фамилия',
			events: {
				click: (e) => e.target.classList.add('focus'),
				focus: (e) => e.target.classList.add('focus'),
				blur: () => console.log('blur')
			}
		});

		const inputPhone = new Input({
			type: 'tel',
			name: 'phone',
			id: 'phone',
			labelName: 'Телефон',
			events: {
				click: (e) => e.target.classList.add('focus'),
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

		const inputConfirmPassword = new Input({
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
			linkToAuthorization: linkToAuthorization,
			inputEmail: inputEmail,
			inputLogin: inputLogin,
			inputFirstName: inputFirstName,
			inputSecondName: inputSecondName,
			inputPhone: inputPhone,
			inputPassword: inputPassword,
			inputConfirmPassword: inputConfirmPassword
		});
	}
}
