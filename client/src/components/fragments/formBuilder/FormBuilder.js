import React, { useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";

//Документы
let documents = [
	{
		id: 1,
		document_status_id: 5, //В работе
		document_type_id: 10, //Закуп ТРУ
		creator_id: 3, //NeboginAA
		name: "Тестовый - Закуп ТРУ", //Имя документа
		created_at: "2022-12-12 15:29:34.840 +0600", //Дата создания
		updated_at: "2022-12-12 15:29:34.840 +0600", //Дата обновление
		finished_at: null, //Дата конца проведение документа
	},
];
//Статусы документов
let document_statuses = [
	{ id: 1, name: "Отклонён" },
	{ id: 2, name: "Согласован" },
	{ id: 3, name: "В работе" },
	{ id: 4, name: "На доработке" },
	{ id: 5, name: "На регистрации" },
	{ id: 6, name: "Документ в ООПЗ" },
	{ id: 7, name: "Исполнен" },
];
//Типы документов
let document_types = [
	{ id: 10, name: "Закуп ТРУ" },
	{ id: 26, name: "Согласование на продажу готовой продукции" },
	{ id: 24, name: "Согласование на закуп ТРУ для производства продукции" },
	{
		id: 27,
		name: "Согласование на закуп ТРУ для внутризаводских нужд и капитальных затрат",
	},
	{ id: 29, name: "Другой" },
];
//Таблица для отображение со всеми типами документов
let document_type_views = [
	{
		id: 1,
		document_type_id: 1,
		view: {
			elements_order: {
				1: {
					key: "From_whom",
					typeData: "text",
				},
				2: {
					key: "Job_title",
					typeData: "text",
				},
				3: {
					key: "Position_type",
					typeData: "text",
				},
				4: {
					key: "Name_of_Goods_Works_Services",
					typeData: "text",
				},
				5: {
					key: "Suppliers_of_Goods_Works_Services",
					typeData: "text",
				},
				6: {
					key: "Base",
					typeData: "text",
				},
				7: {
					key: "Total_contract_amount",
					typeData: "text",
				},
				8: {
					key: "Payment currency",
					typeData: "select_id",
				},
			},
		},
		view_print: {
			elements_order: {
				1: {
					key: "From_whom",
					typeData: "text",
				},
				2: {
					key: "Job_title",
					typeData: "text",
				},
				3: {
					key: "Position_type",
					typeData: "text",
				},
				4: {
					key: "Name_of_Goods_Works_Services",
					typeData: "text",
				},
				5: {
					key: "Suppliers_of_Goods_Works_Services",
					typeData: "text",
				},
				6: {
					key: "Base",
					typeData: "text",
				},
				7: {
					key: "Total_contract_amount",
					typeData: "text",
				},
				8: {
					key: "Payment currency",
					typeData: "select_id",
				},
			},
		},
	},
];
//Словарь ввода-вывода элемента документа
let document_element_IO_dictionary = [
	{ id: 1, key: "From_whom", name: "От кого:", select_value: null },
	{ id: 1, key: "Job_title", name: "Должность:", select_value: null },
	{ id: 1, key: "Position_type", name: "Тип должности:", select_value: null },
	{
		id: 1,
		key: "Name_of_Goods_Works_Services",
		name: "Наименование Товаров Работ Услуг:",
		select_value: null,
	},
	{
		id: 1,
		key: "Suppliers_of_Goods_Works_Services",
		name: "Поставщики Товаров Работ Услуг:",
		select_value: null,
	},
	{ id: 1, key: "Base", name: "Основание:", select_value: null },
	{
		id: 1,
		key: "Total_contract_amount",
		name: "Общая сумма договора:",
		select_value: null,
	},
	{
		id: 1,
		key: "Payment_currency",
		name: "Валюта платежа:",
		select_value: {
			select_id: {
				1: { data: "Казахстанский тенге" },
				2: { data: "Доллар США" },
				3: { data: "Фунт стерлингов" },
				4: { data: "Евро" },
				5: { data: "Китайский юань" },
				6: { data: "Белорусский рубль" },
				7: { data: "Российский рубль" },
			},
		},
	},
];
//Значение данных (наполнение документа)
let document_values = [
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 1,
		value: { typeData: "string", data: "Название документа поле From_whom" },
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 2,
		value: { typeData: "string", data: "Должность Job_title" },
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 3,
		value: { typeData: "string", data: "Тип должности Position_type" },
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 4,
		value: {
			typeData: "string",
			data: "Наименование Товаров Работ Услуг Name_of_Goods_Works_Services",
		},
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 5,
		value: {
			typeData: "string",
			data: "Поставщики Товаров Работ Услуг Suppliers_of_Goods_Works_Services",
		},
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 6,
		value: { typeData: "string", data: "Основание Base" },
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 7,
		value: {
			typeData: "float",
			data: "Общая сумма договора Total_contract_amount",
		},
	},
	{
		id: 1,
		document_id: 1,
		document_element_IO_dictionary: 8,
		value: { typeData: "select_id", data: "1" },
	},
];

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
	const [form] = Form.useForm();
	return (
		<Modal
			open={open}
			title="Create a new collection"
			okText="Create"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{
					modifier: "public",
				}}
			>
				<Form.Item
					name="title"
					label="Title"
					rules={[
						{
							required: true,
							message: "Please input the title of collection!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<Input type="textarea" />
				</Form.Item>
				<Form.Item
					name="modifier"
					className="collection-create-form_last-form-item"
				>
					<Radio.Group>
						<Radio value="public">Public</Radio>
						<Radio value="private">Private</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};
const App = () => {
	const [open, setOpen] = useState(false);
	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setOpen(false);
	};
	return (
		<div>
			<Button
				type="primary"
				onClick={() => {
					setOpen(true);
				}}
			>
				Вызвать создание формы
			</Button>
			<CollectionCreateForm
				open={open}
				onCreate={onCreate}
				onCancel={() => {
					setOpen(false);
				}}
			/>
		</div>
	);
};

export const FormBuilder = () => {
	return <App></App>;
};
