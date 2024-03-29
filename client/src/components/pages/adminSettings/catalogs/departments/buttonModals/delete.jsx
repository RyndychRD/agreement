/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteDepartmentMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/DepartamentApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDepartmentMutationHook}
      deleteText={state.currentRow?.department_name}
    />
  );
}
