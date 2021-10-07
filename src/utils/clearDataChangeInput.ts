export default function clearInput(elem:FormDataEvent):void {
	if(elem.target.className === 'change__data__field') {
		elem.target.value = '';
	}
}
