export function inputFilled(_inputs) {
    _inputs.forEach((el) => {
        el.addEventListener('focus', function () {
            this.classList.add('filled');
        });
    });
}
