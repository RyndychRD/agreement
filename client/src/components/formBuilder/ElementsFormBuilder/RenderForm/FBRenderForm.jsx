import { Button, Card, Form } from "antd";
import "../../FormBuilderStyle.css";
import ReturnElement from "./FBReturnElement";

function FormBuilderDataComponent({ FormBuilderData, form }) {
	console.log("FormBuilderDataComponent=>", FormBuilderData);
	return FormBuilderData?.map((ComponentItem) => (
		<Form.Item name={ComponentItem.AreaType} key={ComponentItem.AreaType}>
			<Card
				size="small"
				title={`${ComponentItem.AreaName}  ===> ${ComponentItem.AreaType} `}
				key={ComponentItem.AreaName}
			>
				<ReturnElement AreaType={ComponentItem.AreaType} form={form} />
			</Card>
		</Form.Item>
	));
}
export default function RenderForm({ FormBuilderData, form }) {
	const onFinish = (values) => {
		console.log(form);
		console.log(JSON.stringify(form.getFieldsValue(), null, 2));
		console.log("Success:", values);
	};

	const onValuesChange = (values) => {
		console.log("onValuesChange:", values);
	};

	return (
		<Form form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
			<Button type="primary" htmlType="submit">
				Проверить форму
			</Button>
			<FormBuilderDataComponent FormBuilderData={FormBuilderData} form={form} />
		</Form>
	);
}
