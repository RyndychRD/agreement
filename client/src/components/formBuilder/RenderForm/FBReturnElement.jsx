import {
	documentElementIODictionary,
	documentTypeViews,
} from "../FormBuilderInstanceForm";

import RenderDataPicker from "../ElementsFormBuilder/FBRenderDataPicker/FBRenderDataPicker";
import RenderEmailInput from "../ElementsFormBuilder/FBRenderEmailInput/FBEmailInput";
import RenderPhone from "../ElementsFormBuilder/FBRenderPhone/FBRenderPhone";
import RenderSelectID from "../ElementsFormBuilder/FBRenderSelectID/FBRenderSelectID";
import RenderSelectTable from "../ElementsFormBuilder/FBRenderTable/FBRenderSelectTable";
import RenderTextInput from "../ElementsFormBuilder/FBRenderTextInput/FBRenderTextInput";

export default function ReturnElement(props) {
	const { AreaType } = props;

	const CurrentElement = documentElementIODictionary.filter(
		(i) => i.key === AreaType
	)[0];

	const DataKey = documentTypeViews[0].view.elements_order.find(
		(i) => i.key === AreaType
	);

	switch (DataKey.typeData) {
		case "text":
			return <RenderTextInput CurrentElement={CurrentElement} {...props} />;
		case "email":
			return <RenderEmailInput CurrentElement={CurrentElement} {...props} />;
		case "datePicker":
			return <RenderDataPicker CurrentElement={CurrentElement} {...props} />;
		case "phone": {
			return <RenderPhone CurrentElement={CurrentElement} {...props} />;
		}
		case "select_id": {
			return <RenderSelectID CurrentElement={CurrentElement} {...props} />;
		}
		case "table": {
			return <RenderSelectTable CurrentElement={CurrentElement} {...props} />;
		}

		default:
			return "Не найдено нечего !";
	}
}
