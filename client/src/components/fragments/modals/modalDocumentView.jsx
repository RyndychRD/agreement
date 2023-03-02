import { Modal, Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../tables/TableModalProvider";
import { MainDocumentInformation } from "../outputs/textOutputs";
import DocumentInformationFragment from "../documentControl/documentInformation/DocumentInformationShowFragment";
import RouteStepsFragment from "../documentControl/documentRoute/RouteStepsFragment";
import DocumentFilesFragment from "../documentControl/documentFiles/DocumentFilesFragment";
import DocumentRemark from "../documentControl/documentRemark/DocumentRemark";
import NotificationService from "../../../services/DocumentControlServices/NotificationService";
import DocumentTasksFragment from "../documentControl/documentTasks/DocumentTasksFragment";
import DocumentPrintFragment from "../documentControl/documentPrint/DocumentPrintFragment";
import DocumentRegistrationFragment from "../documentControl/documentRegistration/DocumentMitvorgFragment";
import DocumentToArchiveFragment from "../documentControl/documentToArchive/documentToArchiveFragment";
import {
  replaceUrlQueryWithId,
  clearUrlQueryParams,
} from "../../../services/CommonFunctions";

export default function ModalDocumentView(props) {
  const {
    notificationType = "",
    isAbleToSign = false,
    isAbleToEdit = false,
    isAbleToUploadFiles = isAbleToEdit,
    isAddForPrint = false,
    isShowDocumentTasks = false,
    isShowRegistrationInOOPZ = false,
    isShowRoute = false,
    isShowToArchive = false,
  } = props;
  const state = useTableModalsState();
  const dispatch = useTableModalDispatch();
  const isOpen = state.isShowUpdateModal && state.currentRow;

  const navigate = useNavigate();
  const onCancel = () => {
    dispatch({ type: "closeAllModal" });
    navigate(clearUrlQueryParams());
  };
  useEffect(() => {
    if (notificationType && isOpen) {
      // Читаем все нотификации по этому документу если передан идентификатор по которому читать
      NotificationService.readNotifications({
        elementId: state.currentRow.document_id,
        notificationType,
      });
    }
    if (isOpen) {
      replaceUrlQueryWithId(state.currentRow?.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (isOpen)
    return (
      <Modal
        width={isShowDocumentTasks ? 1000 : 500}
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
        <DocumentFilesFragment
          key="FilesUploaded"
          documentId={state.currentRow?.document_id}
          isAbleToUploadFiles={isAbleToUploadFiles}
        />
        {/* Отображать ли кнопку перевода документа в Архив */}
        {isShowToArchive ? (
          <DocumentToArchiveFragment
            documentId={state.currentRow?.document_id}
            closeModalFunc={onCancel}
          />
        ) : (
          ""
        )}
        {/* Отображать ли отправку на печать */}
        {isAddForPrint ? (
          <DocumentPrintFragment documentId={state.currentRow?.document_id} />
        ) : (
          ""
        )}
        {/* Отображать ли регистрацию в ООПЗ */}
        {isShowRegistrationInOOPZ ? (
          <DocumentRegistrationFragment
            documentId={state.currentRow?.document_id}
            closeModalFunc={onCancel}
          />
        ) : (
          ""
        )}

        {isShowRoute ? (
          <RouteStepsFragment
            isStart={state.isShowUpdateModal}
            documentId={state.currentRow?.document_id}
            isAbleToSign={isAbleToSign}
            isAbleToEdit={isAbleToEdit}
          />
        ) : (
          ""
        )}
        {/* Если статус документа Отклонен или На доработке, то мы должны показать замечание, по которому этот документ попал в такой статус */}
        <DocumentRemark
          documentStatusId={state.currentRow?.document_status_id}
          documentRemark={state.currentRow?.document_remark}
        />
        {/* Отображать ли поручения по документу */}
        {isShowDocumentTasks ? (
          <DocumentTasksFragment documentId={state.currentRow?.document_id} />
        ) : (
          ""
        )}
      </Modal>
    );
}
