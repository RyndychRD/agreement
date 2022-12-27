import { Button, Card, Form } from "antd";
import { useId } from "react";
import "../../FormBuilderStyle.css";
import ReturnElement from "./FBReturnElement";

export default function RenderForm({ FormBuilderData, form }) {
	const size = 100;
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const FormBuilderDataComponent = () =>
		FormBuilderData?.map((ComponentItem) => (
			<Form.Item key={useId}>
				<Card
					size="small"
					title={`${ComponentItem.AreaName}  ===> ${ComponentItem.AreaType} `}
					key={ComponentItem.AreaName}
				>
					{ReturnElement(ComponentItem.AreaType, size)}
				</Card>
			</Form.Item>
		));

	return (
		<Form form={form} onFinish={onFinish}>
			<Button type="primary" htmlType="submit">
				Проверить форму
			</Button>
			<FormBuilderDataComponent />
		</Form>
	);
}
