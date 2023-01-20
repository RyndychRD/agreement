/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeleteDocumentTypeViewHook } from "../../../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeleteDocumentTypeViewHook}
      deleteText={state.currentRow?.type_name_for_delete}
    />
  );
}
