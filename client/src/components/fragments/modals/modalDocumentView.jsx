import { Modal, Button } from "antd";

import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";
import { MainDocumentInformation } from "../outputs/textOutputs";
import DocumentInformationFragment from "../documentControl/documentInformation/DocumentInformationShowFragment";
import RouteStepsFragment from "../documentControl/documentRoute/RouteStepsFragment";

export default function ModalDocumentView() {
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
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
        <MainDocumentInformation
          key="MainModal"
          documentName={state.currentRow?.document_name}
          typeName={state.currentRow?.document_type}
        />
        <DocumentInformationFragment
          isStart={state.isShowUpdateModal}
          documentId={state.currentRow?.document_id}
        />
        <RouteStepsFragment
          isStart={state.isShowUpdateModal}
          documentId={state.currentRow?.document_id}
        />
      </Modal>
    );
}
