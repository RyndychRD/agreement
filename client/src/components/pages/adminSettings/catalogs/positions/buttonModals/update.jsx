import { Form } from "antd";
import {
  useGetPositionQueryHook,
  useUpdatePositionMutationHook,
} from "../../../../../../core/redux/api/Globals/Catalogs/PositionsApi";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";
import getUniqNotNullIds from "../../../../../../services/CommonFunctions";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = Form.useForm();

  const formDefaultValues = (data) => ({
    newPositionName: data?.name,
    departmentId: data?.department_id,
    rightIds: getUniqNotNullIds(data?.rights),
    inheritedRights: getUniqNotNullIds(data?.rights_inherited),
  });
  return (
    <ModalUpdate
      getQuery={useGetPositionQueryHook}
      updateMutation={useUpdatePositionMutationHook}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
