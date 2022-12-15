import { SimpleTextInput } from "../../../../../fragments/inputs/textInputs";
import { ModalInput } from "../../../../../fragments/modals/modals";
import { AForm } from "./../../../../../adapter";
import { useState } from "react";
import { useSelector } from "react-redux";

import { openCloseCreateModal } from "../DepartmentsReducer";

export default function CreateButtonModel() {
	const onFinish = (props) => {
		console.log("Сабмит на форме: ", props);
	};

	const isOpen = useSelector((state) => state.departments.isShowCreateModal);

	return (
		<ModalInput open={isOpen} onCancel={() => {}}>
			<AForm onFinish={onFinish}>
				<SimpleTextInput name="Наименование департамента"></SimpleTextInput>
			</AForm>
		</ModalInput>
	);
}
