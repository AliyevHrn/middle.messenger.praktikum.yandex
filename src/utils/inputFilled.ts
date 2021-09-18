export function inputFilled(_inputs:NodeList):void {
	console.log(_inputs);
	_inputs.forEach((el) => {
		el.addEventListener('focus', function () {
			this.classList.add('filled');
		});
	});
}
