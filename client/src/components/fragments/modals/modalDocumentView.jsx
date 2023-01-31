import { Modal, Button } from "antd";

import { useEffect } from "react";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";
import { MainDocumentInformation } from "../outputs/textOutputs";
import DocumentInformationFragment from "../documentControl/documentInformation/DocumentInformationShowFragment";
import RouteStepsFragment from "../documentControl/documentRoute/RouteStepsFragment";
import DocumentFilesFragment from "../documentControl/documentFiles/DocumentFilesFragment";
import DocumentRemark from "../documentControl/documentRemark/DocumentRemark";
import NotificationService from "../../../services/DocumentServices/NotificationService";

export default function ModalDocumentView(props) {
  const { notificationType = "", isAbleToSign = false } = props;
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const isOpen = state.isShowUpdateModal && state.currentRow;

  const onCancel = () => {
    dispatch({ type: "closeAllModal" });
  };
  useEffect(() => {
    if (notificationType && isOpen) {
      // Читаем все нотификации по этому документу если передан идентификатор по которому читать
      NotificationService.readNotifications({
        documentId: state.currentRow.document_id,
        notificationType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
          isAbleToSign={isAbleToSign}
        />
      </Modal>
    );
}
