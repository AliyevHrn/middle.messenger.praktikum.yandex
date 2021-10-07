import Validator from './validator';

export default class FormValidate {
	inputs:any[];
	formElem:HTMLFormElement;
	constructor() {
		this.formElem = document.getElementsByTagName('form')[0];
		if(this.formElem) {
			this.formElem.addEventListener('blur', this.checkFields.bind(this), true);
		}
	}

	checkFields (event:any) {
		if(event.target.tagName === 'INPUT') {
			FormValidate.validateMessages(event.target);
		}
	}

	static validateMessages (input:HTMLInputElement):boolean {
		let errorMessage:string;
		let flag:boolean;
		const password1:HTMLInputElement = document.getElementById('password');

		switch (input.name) {
		case 'login':
			!Validator.validate(input.value, Validator.LOGIN) ? errorMessage = 'Введите корректный логин' : '';
			!Validator.validate(input.value, Validator.LOGIN) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.LOGIN) ? flag = false : flag = true;
			break;
		case 'first_name':
			!Validator.validate(input.value, Validator.NAME) ? errorMessage = 'Введите имя (латиница или кирилица, первая буква должна быть заглавной)' : '';
			!Validator.validate(input.value, Validator.NAME) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.NAME) ? flag = false : flag = true;
			break;
		case 'second_name':
			!Validator.validate(input.value, Validator.NAME) ? errorMessage = 'Введите фамилию (латиница или кирилица, первая буква должна быть заглавной)' : '';
			!Validator.validate(input.value, Validator.NAME) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.NAME) ? flag = false : flag = true;
			break;
		case 'email':
			!Validator.validate(input.value, Validator.EMAIL) ? errorMessage = 'Введите корректный email' : '';
			!Validator.validate(input.value, Validator.EMAIL) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.EMAIL) ? flag = false : flag = true;
			break;
		case 'password':
			!Validator.validate(input.value, Validator.PASSWORD) ? errorMessage = 'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра' : '';
			!Validator.validate(input.value, Validator.PASSWORD) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.PASSWORD) ? flag = false : flag = true;
			break;
		case 'сonfirm_password':
			password1.value !== input.value ? errorMessage = 'Пароли должны совпадать' : '';
			password1.value !== input.value ? input.classList.add('invalid') : input.classList.remove('invalid');
			password1.value !== input.value ? flag = false : flag = true;
			break;
		case 'phone':
			!Validator.validate(input.value, Validator.PHONE) ? errorMessage = 'Введите номер телефона' : '';
			!Validator.validate(input.value, Validator.PHONE) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.PHONE) ? flag = false : flag = true;
			break;
		case 'message':
			!Validator.validate(input.value, Validator.MESSAGE) ? input.focus() : '';
			!Validator.validate(input.value, Validator.MESSAGE) ? flag = false : flag = true;
			break;
		default:
			!Validator.validate(input.value, Validator.REQUIRED) ? errorMessage = 'Пожалуйста, заполните поле!' : '';
			!Validator.validate(input.value, Validator.REQUIRED) ? input.classList.add('invalid') : input.classList.remove('invalid');
			!Validator.validate(input.value, Validator.REQUIRED) ? flag = false : flag = true;
			break;
		}

		if(input.name !== 'message') {
			input.parentNode.nextSibling.style.display = 'block';
			input.parentNode.nextSibling.textContent = errorMessage;
		}

		return flag;
	}

}
