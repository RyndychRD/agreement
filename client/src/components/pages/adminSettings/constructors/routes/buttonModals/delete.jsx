/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteRouteMutationHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/RouteConstructorApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteRouteMutationHook}
      deleteText={state.currentRow?.type_name_for_delete}
    />
  );
}
