/* eslint-disable react/react-in-jsx-scope */
import ModalDelete from "../../../../../fragments/modals/modalDelete";
import { useCustomState } from "../../../../../fragments/tables/Provider";
import { useDeletePositionMutation } from "../../../../../../core/redux/api/AdminSettings/Catalogs/PositionsApi";

export default function DeleteButtonAction() {
  const state = useCustomState();
  return (
    <ModalDelete
      deleteMutation={useDeletePositionMutation}
      deleteText={state.currentRow?.position_name}
    />
  );
}
