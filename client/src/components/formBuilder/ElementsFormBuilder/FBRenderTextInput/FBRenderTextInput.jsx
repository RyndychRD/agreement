import { Input } from "antd";
import FBElementLayout from "../FBElementLayout";


export default function RenderTextInput(props) {
	const { AreaType, CurrentElement } = props;

	return (
		<FBElementLayout name={CurrentElement.name}>
			<Input id={AreaType} type="text" />
		</FBElementLayout>
	);
}
