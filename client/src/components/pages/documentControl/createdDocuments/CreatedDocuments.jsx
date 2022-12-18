import { FormBuilder } from "../../../fragments/formBuilder/FormBuilder";

export function CreatedDocument(props) {
	return (
		<div>
			{props.children}
			<FormBuilder />
		</div>
	);
}
