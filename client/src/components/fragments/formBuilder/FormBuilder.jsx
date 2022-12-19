/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import {
	DownSquareTwoTone,
	MinusCircleOutlined,
	PlusOutlined,
	UpSquareTwoTone,
} from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Space } from 'antd'
import { useState } from 'react'
import color from './FormBuilderColorRow'

import {
	// eslint-disable-next-line no-unused-vars
	documents,
	// eslint-disable-next-line no-unused-vars
	document_element_IO_dictionary,
	// eslint-disable-next-line no-unused-vars
	document_statuses,
	// eslint-disable-next-line no-unused-vars
	document_types,
	// eslint-disable-next-line no-unused-vars
	document_type_views,
	// eslint-disable-next-line no-unused-vars
	document_values,
} from './FormBuilderInstanceForm'

function Component() {
	const onFinish = () => {}
	return (
		<Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
			<Form.List name="users">
				{(fields, { add, remove, move }) => (
					<>
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<PlusOutlined />}
							>
								Добавить поле
							</Button>
						</Form.Item>
						{fields.length !== 0 && (
							<span>Всего элементов на форме №{fields.length}</span>
						)}
						{fields.map(({ key, name, ...restField }) => (
							<Space
								key={key}
								style={{
									display: 'flex',
									margin: '5px',
									padding: '5px',
									border: `5px ridge ${color[key]}`,
									opacity: '1',
									backdropFilter: 'sepia(100%)',
								}}
								align="baseline"
							>
								Порядок в списке №{name}
								<Form.Item
									{...restField}
									name={[name, 'first']}
									rules={[
										{
											required: true,
											message: 'Данные не внесены',
										},
									]}
								>
									<Input placeholder="Наименование поля" />
								</Form.Item>
								<Form.Item
									{...restField}
									name={[name, 'last']}
									rules={[
										{
											required: true,
											message: 'Данные не внесены',
										},
									]}
								>
									<Select
										showSearch
										style={{
											width: '350px',
										}}
										placeholder="Выберите элемент"
										optionFilterProp="children"
										filterOption={(input, option) =>
											(option?.label ?? '').includes(input)
										}
										filterSort={(optionA, optionB) =>
											(optionA?.label ?? '')
												.toLowerCase()
												.localeCompare((optionB?.label ?? '').toLowerCase())
										}
										options={[
											{
												value: document_element_IO_dictionary[0].key,
												label: document_element_IO_dictionary[0].name,
											},
											{
												value: document_element_IO_dictionary[1].key,
												label: document_element_IO_dictionary[1].name,
											},
											{
												value: document_element_IO_dictionary[2].key,
												label: document_element_IO_dictionary[2].name,
											},
											{
												value: document_element_IO_dictionary[3].key,
												label: document_element_IO_dictionary[3].name,
											},
											{
												value: document_element_IO_dictionary[4].key,
												label: document_element_IO_dictionary[4].name,
											},
											{
												value: document_element_IO_dictionary[5].key,
												label: document_element_IO_dictionary[5].name,
											},
											{
												value: document_element_IO_dictionary[6].key,
												label: document_element_IO_dictionary[6].name,
											},
											{
												value: document_element_IO_dictionary[7].key,
												label: document_element_IO_dictionary[7].name,
											},
										]}
									/>
								</Form.Item>
								<button
									style={{
										border: `3px ridge ${color[key]}`,
										backdropFilter: 'sepia(100%)',
									}}
									type="button"
									onClick={() => remove(name)}
								>
									Удалить <MinusCircleOutlined />
								</button>
								{name >= 1 && (
									<button
										style={{
											border: `3px ridge ${color[key]}`,
											backdropFilter: 'sepia(100%)',
										}}
										type="button"
										onClick={() => remove(move(name, name - 1))}
									>
										Выше <UpSquareTwoTone />
									</button>
								)}
								{name < fields.length - 1 && (
									<button
										style={{
											border: `3px ridge ${color[key]}`,
											backdropFilter: 'sepia(100%)',
										}}
										type="button"
										onClick={() => remove(move(name, name + 1))}
									>
										Ниже <DownSquareTwoTone />
									</button>
								)}
							</Space>
						))}
					</>
				)}
			</Form.List>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Сохранить форму
				</Button>
			</Form.Item>
		</Form>
	)
}

function CustomInput() {
	return <Component />
}

function CollectionCreateForm({ open, onCreate, onCancel }) {
	const [form] = Form.useForm()

	return (
		<Modal
			open={open}
			title="Создать новую форму"
			okText="Сохранить"
			cancelText="Закрыть"
			onCancel={onCancel}
			width="95%"
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields()
						onCreate(values)
					})
					.catch((info) => {
						console.log('Validate Failed:', info)
					})
			}}
		>
			<CustomInput />
			{/* <MemoizedValue /> */}
		</Modal>
	)
}

function App() {
	const [open, setOpen] = useState(false)
	const onCreate = (values) => {
		console.log('Received values of form: ', values)
		setOpen(false)
	}
	return (
		<div>
			<Button
				type="primary"
				onClick={() => {
					setOpen(true)
				}}
			>
				Создать новую форму
			</Button>
			<CollectionCreateForm
				open={open}
				onCreate={onCreate}
				onCancel={() => {
					setOpen(false)
				}}
			/>
		</div>
	)
}

export default function FormBuilder() {
	return <App />
}
