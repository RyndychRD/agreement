/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteUserMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/UserApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteUserMutationHook}
      deleteText={state.currentRow?.user_fio}
    />
  );
}
