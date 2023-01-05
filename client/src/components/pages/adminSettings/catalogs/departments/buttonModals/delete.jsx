/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteDepartmentMutation } from "../../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDepartmentMutation}
      deleteText={state.currentRow?.department_name}
    />
  );
}
