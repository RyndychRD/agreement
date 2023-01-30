/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useTableModalsState } from "../../../../../fragments/tables/TableModalProvider";
import { useDeletePositionMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/PositionsApi";

export default function DeleteButtonAction() {
  const state = useTableModalsState();
  return (
    <ModalDelete
      deleteMutation={useDeletePositionMutationHook}
      deleteText={state.currentRow?.position_name}
    />
  );
}
