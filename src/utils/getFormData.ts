import FormValidate from './formValidate';

export default class FormData {
	formElem:HTMLFormElement;

	constructor() {
		this.formElem = document.getElementsByTagName('form')[0];
		if(this.formElem) {
			this.formElem.onsubmit = this.getData.bind(this);
		}
	}

	getData (event:any):boolean {
		event.preventDefault();
		const formData:Record<string, unknown> = {};
		const formInputs:Array<HTMLInputElement> = Array.from(this.formElem);
		const flags:boolean[] = [];
		let flag:boolean;

		for(const item of formInputs) {
			if(item.tagName === 'INPUT') {
				const isValid:boolean = FormValidate.validateMessages(item);
				if(isValid && item.value.length !== 0) {
					formData[item.name] = item.value;
					flags.push(true);
				} else {
					flags.push(false);
				}
			}
		}
		for(const item of flags) {
			if(item === false) {
				flag = false;
				return false;
			}
			flag = true;
		}
		if(flag) console.log(formData);
		return true;
	}
}
