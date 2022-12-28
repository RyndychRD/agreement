import _ from "lodash";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../../../../core/redux/api/AdminSettings/Catalogs/UserApi";
import { AUseForm } from "../../../../../adapter";
import ModalUpdate from "../../../../../fragments/modals/modalUpdate";
import CreateUpdateForm from "./createUpdateForm";

const PASSWORD_PLACEHOLDER = "*********";

const isPasswordSame = (pass) => pass === PASSWORD_PLACEHOLDER;

const preFinishFunction = (values) => {
  const valuesPassCheck = values;
  if (isPasswordSame(valuesPassCheck.newPassword)) {
    delete valuesPassCheck.newPassword;
  }
  return valuesPassCheck;
};

export default function UpdateButtonModel() {
  // Служит для отслеживания формы из модального окна для обработки по кнопке
  const [form] = AUseForm();
  const formDefaultValues = (data) => ({
    newLogin: data?.login,
    newEmail: data?.email,
    newPassword: PASSWORD_PLACEHOLDER,
    newFirstName: data?.first_name,
    newLastName: data?.last_name,
    newMiddleName: data?.middle_name,
    positionId: data?.position_id,
    isDisabled: data?.is_disabled,
    rightIds: _.uniq(_.reject(data?.rights, ["id", null])?.map((el) => el.id)),
    inheritedRights: _.uniq(
      _.reject(
        data?.rights_inherited_position?.concat(
          data?.rights_inherited_department
        ),
        ["id", null]
      )?.map((el) => el.id)
    ),
  });
  return (
    <ModalUpdate
      getQuery={useGetUserQuery}
      updateMutation={useUpdateUserMutation}
      form={form}
      CreateUpdateForm={CreateUpdateForm}
      formDefaultValues={formDefaultValues}
      preFinishFunc={preFinishFunction}
    />
  );
}
