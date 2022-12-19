import { ASpan, AInput } from '../../adapter'

export default function SimpleTextInput({
	name = 'Поле ввода',
	inputClass = 'input',
}) {
	return (
		<>
			<ASpan>{name}</ASpan>
			<AInput className={inputClass} placeholder={name} />
		</>
	)
}
