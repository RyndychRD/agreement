/* eslint-disable camelcase */
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import {
	Provider,
	useCustomState,
	useCustomDispatch,
} from "./FormBuilderProvider";
import RenderForm from "./ElementsFormBuilder/RenderForm/FBRenderForm";
import CustomInput from "./ElementsFormBuilder/FBCustomInput";

import "./FormBuilderStyle.css";

function CollectionCreateForm({ open, onCreate, onCancel }) {
	const [form] = Form.useForm();

	// const stateReact = useCustomState();
	const { FormBuilderData } = useCustomState();
	const dispatchReact = useCustomDispatch();

	return (
		<Modal
			open={open}
			title="Создать новую форму"
			okText="Сохранить"
			cancelText="Закрыть"
			onCancel={() => {
				dispatchReact({ type: "CancelButton" });
				onCancel();
			}}
			width="95%"
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
			{FormBuilderData?.FormBuilder ? (
				<RenderForm FormBuilderData={FormBuilderData.FormBuilder} />
			) : (
				<CustomInput />
			)}
		</Modal>
	);
}

export default function FormBuilder() {
	const [open, setOpen] = useState(false);
	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setOpen(false);
	};

	return (
		<div>
			<Provider>
				<Button
					type="primary"
					onClick={() => {
						setOpen(true);
					}}
				>
					Создать новую форму
				</Button>
				<CollectionCreateForm
					open={open}
					onCreate={onCreate}
					onCancel={() => {
						setOpen(false);
					}}
				/>
			</Provider>
		</div>
	);
}
