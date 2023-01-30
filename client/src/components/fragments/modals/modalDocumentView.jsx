import { Modal, Button } from "antd";

import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";
import { MainDocumentInformation } from "../outputs/textOutputs";
import DocumentInformationFragment from "../documentControl/documentInformation/DocumentInformationShowFragment";
import RouteStepsFragment from "../documentControl/documentRoute/RouteStepsFragment";
import DocumentFilesFragment from "../documentControl/documentFiles/DocumentFilesFragment";
import DocumentRemark from "../documentControl/documentRemark/DocumentRemark";

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
          fileList={state.currentRow?.document_files}
        />
        <DocumentFilesFragment
          key="FilesUploaded"
          documentId={state.currentRow?.document_id}
        />
        <DocumentInformationFragment
          isStart={state.isShowUpdateModal}
          documentId={state.currentRow?.document_id}
        />
        {/* Если статус документа Отклонен или На доработке, то мы должны показать замечание, по которому этот документ попал в такой статус */}
        <DocumentRemark
          documentStatusId={state.currentRow?.document_status_id}
          documentRemark={state.currentRow?.document_remark}
        />
        <RouteStepsFragment
          isStart={state.isShowUpdateModal}
          documentId={state.currentRow?.document_id}
        />
      </Modal>
    );
}
