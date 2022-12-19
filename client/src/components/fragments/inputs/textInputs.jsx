import { AInput, AFormItem } from '../../adapter'
import React from 'react'

export function TextInput_FormItem({
	title = 'Поле ввода',
	name = 'formItemName',
	rules = {},
}) {
	return (
		<AFormItem label={title} name={name} rules={rules} labelCol={{ span: 24 }}>
			<AInput placeholder={title}></AInput>
		</AFormItem>
	)
}
