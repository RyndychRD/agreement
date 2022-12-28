import _ from "lodash";
import {
  useGetPositionQuery,
  useUpdatePositionMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";
import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();

  const formDefaultValues = (data) => ({
    newPositionName: data?.name,
    departmentId: data?.department_id,
    isSigner: data?.is_signer,
    rightIds: _.uniq(_.reject(data?.rights, ["id", null])?.map((el) => el.id)),
    inheritedRights: _.uniq(
      _.reject(data?.rights_inherited, ["id", null])?.map((el) => el.id)
    ),
  });
  return (
    <ModalUpdate
      getQuery={useGetPositionQuery}
      updateMutation={useUpdatePositionMutation}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
    />
  );
}
