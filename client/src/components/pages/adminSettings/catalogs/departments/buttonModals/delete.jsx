/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteDepartmentMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDepartmentMutationHook}
      deleteText={state.currentRow?.department_name}
    />
  );
}
