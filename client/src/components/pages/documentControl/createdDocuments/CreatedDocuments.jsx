import { FormBuilder } from "../../../fragments/formBuilder/FormBuilder";
import React from "react";

export function CreatedDocument(props) {
	return (
		<div>
			{props.children}
			<FormBuilder />
		</div>
	);
}
