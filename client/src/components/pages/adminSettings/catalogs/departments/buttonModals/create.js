import { SimpleTextInput } from "../../../../../fragments/inputs/textInputs";
import { ModalInput } from "../../../../../fragments/modals/modals";
import { AForm } from "./../../../../../adapter";
import { useState } from "react";
export default function CreateButtonModel({ open = false }) {
	const onFinish = (props) => {
		console.log("Сабмит на форме: ", props);
	};

	const [isOpen, setIsOpen] = useState(open);

	return (
		<ModalInput
			open={isOpen}
			onCancel={() => {
				setIsOpen(false);
			}}
		>
			<AForm onFinish={onFinish}>
				<SimpleTextInput name="Наименование департамента"></SimpleTextInput>
			</AForm>
		</ModalInput>
	);
}
