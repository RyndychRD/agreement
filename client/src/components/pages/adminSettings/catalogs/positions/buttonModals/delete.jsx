/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeletePositionMutationHook } from "../../../../../../core/redux/api/Globals/Catalogs/PositionsApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeletePositionMutationHook}
      deleteText={state.currentRow?.position_name}
    />
  );
}
