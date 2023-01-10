import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import getUniqNotNullIds from "../../../../../../services/CommonFunctions";
import {
	useGetDepartmentQueryHook,
	useUpdateDepartmentMutationHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";

export default function UpdateButtonModel() {
	// Служит для отслеживания формы из модального окна для обработки по кнопке
	const [form] = AUseForm();
	const formDefaultValues = (data) => ({
		newDepartmentName: data?.name,
		rightIds: getUniqNotNullIds(data?.rights),
	});
	return (
		<ModalUpdate
			getQuery={useGetDepartmentQueryHook}
			updateMutation={useUpdateDepartmentMutationHook}
			form={form}
			CreateUpdateForm={CreateUpdateForm}
			formDefaultValues={formDefaultValues}
		/>
	);
}
