import { Card } from "antd";
import "../../FormBuilderStyle.css";
import ReturnElement from "./FBReturnElement";

export default function RenderForm({ FormBuilderData }) {
	const size = 100;
	return FormBuilderData?.map((ComponentItem) => (
		<Card
			title={`${ComponentItem.AreaName}  ===> ${ComponentItem.AreaType} `}
			key={ComponentItem.AreaName}
		>
			{ReturnElement(ComponentItem.AreaType, size)}
		</Card>
	));
}
