/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeleteUserMutation } from "../../../../../../core/redux/api/Globals/Catalogs/UserApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeleteUserMutation}
      deleteText={state.currentRow?.user_fio}
    />
  );
}
