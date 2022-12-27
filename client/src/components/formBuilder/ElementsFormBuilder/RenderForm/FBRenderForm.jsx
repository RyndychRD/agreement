import { Button, Card, Form } from "antd";
import { useId } from "react";
import "../../FormBuilderStyle.css";
import ReturnElement from "./FBReturnElement";

export default function RenderForm({ FormBuilderData, form }) {
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const FormBuilderDataComponent = () =>
		FormBuilderData?.map((ComponentItem) => {
			console.log("console.log(ComponentItem)", ComponentItem);
			return (
				<Card
					size="small"
					title={`${ComponentItem.AreaName}  ===> ${ComponentItem.AreaType} `}
					key={ComponentItem.AreaName}
				>
					<Form.Item
						label={ComponentItem.AreaType}
						name={ComponentItem.AreaType}
						key={useId}
					>
						<ReturnElement key={ComponentItem.AreaType} />
					</Form.Item>
				</Card>
			);
		});

	return (
		<Form form={form} onFinish={onFinish}>
			<Button type="primary" htmlType="submit">
				Проверить форму
			</Button>
			{FormBuilderDataComponent()}
		</Form>
	);
}
