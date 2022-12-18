import { ASpan, AInput } from '../../adapter'
import React from 'react'

export function SimpleTextInput({ name = 'Поле ввода', inputClass = 'input' }) {
	return (
		<>
			<ASpan>{name}</ASpan>
			<AInput className={inputClass} placeholder={name}></AInput>
		</>
	)
}
