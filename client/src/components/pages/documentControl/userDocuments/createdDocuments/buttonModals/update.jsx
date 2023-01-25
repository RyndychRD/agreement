import { Button, Modal } from "antd";
import RouteStepsFragment from "../../../../../fragments/documentControl/documentRoute/RouteStepsFragment";
import DocumentInformationFragment from "../../../../../fragments/documentControl/documentInformation/DocumentInformationShowFragment";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../../../../../fragments/tables/TableModalProvider";
import { MainDocumentInformation } from "../../../../../fragments/outputs/textOutputs";

export default function UpdateButtonModel() {
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
