import { Button, Modal } from "antd";
import {
  useCustomDispatch,
  useCustomState,
} from "../../../../../fragments/tables/Provider";
import DocumentRouteService from "../../../../../../services/DocumentServices/DocumentRouteService";

export default function UpdateButtonModel() {
  const state = useCustomState();
  const dispatch = useCustomDispatch();
  const isOpen = state.isShowUpdateModal && state.currentRow;

  const onCancel = () => {
    dispatch({ type: "closeAllModal" });
  };

  if (isOpen)
    return (
      <Modal
        open={isOpen}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Закрыть
          </Button>,
        ]}
      >
        <span>
          Текущий выбранный договор: {state.currentRow?.document_name}
        </span>
        <Button
          onClick={() => {
            DocumentRouteService.submitDocumentRoute({
              usersToSign: [{ signer_id: 1 }, { signer_id: 3 }],
              documentId: state.currentRow?.document_id,
            });
          }}
        >
          Начать проведение договора
        </Button>
      </Modal>
    );
  return null;
}
