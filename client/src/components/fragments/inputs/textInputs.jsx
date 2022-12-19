/** @format */

import { AInput, AFormItem } from '../../adapter'

export default function TextInputFormItem({
	title = 'Поле ввода',
	name = 'formItemName',
	rules = {},
}) {
	return (
		<AFormItem
			label={title}
			name={name}
			rules={rules}
			labelCol={{ span: 24 }}
		>
			<AInput placeholder={title} />
		</AFormItem>
	)
}
