export default class Validator {
	static REQUIRED = 'REQUIRED';
	static NAME = 'NAME';
	static LOGIN = 'LOGIN';
	static EMAIL = 'EMAIL';
	static PASSWORD = 'PASSWORD';
	static PHONE = 'PHONE';
	static MESSAGE = 'MESSAGE';

	static validate(value:string, flag:string) {
		if(flag === this.NAME) {
			const re = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/;
			return re.test(value);
		}
		if(flag === this.LOGIN) {
			const re = /^[a-z0-9_-]{3,20}$/;
			return re.test(value);
		}
		if(flag === this.EMAIL) {
			const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
			return re.test(value);
		}
		if(flag === this.PASSWORD) {
			const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,40}$/gm;
			return re.test(value);
		}
		if(flag === this.PHONE) {
			const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/;
			return re.test(value);
		}
		if(flag === this.MESSAGE || flag === this.REQUIRED) {
			return value.trim().length > 0;
		}
	}
}
