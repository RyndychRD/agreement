/** @format */

import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AForm } from '../../../../../adapter'
import TextInputFormItem from '../../../../../fragments/inputs/textInputs'
import { ModalInput } from '../../../../../fragments/modals/modals'
import { closeCreateModal, createDepartment } from '../DepartmentsReducer'

export default function CreateButtonModel() {
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const onFinish = () => {
		form
			.validateFields()
			.then((values) => {
				dispatch(createDepartment(values))
			})
			.catch((info) => {
				console.log(
					'Ошибка валидации на форме создания департамента:',
					info
				)
			})
	}

	// Специально такой вызов, по другому сделаю позже. Служит для отслеживания формы из модального окна для обработки по кнопке
	const isOpen = useSelector((state) => state.departments.isShowCreateModal)

	return (
		<ModalInput
			open={isOpen}
			onOk={onFinish}
			onCancel={() => {
				form.resetFields()
				dispatch(closeCreateModal())
			}}
		>
			<AForm form={form}>
				<TextInputFormItem
					title='Наименование департамента'
					name='newDepartmentName'
					rules={[
						{
							required: true,
							message: 'Введите название департамента',
						},
					]}
				/>
			</AForm>
		</ModalInput>
	)
}
