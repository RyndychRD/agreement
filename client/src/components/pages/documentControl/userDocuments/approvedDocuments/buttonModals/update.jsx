import ModalDocumentView from "../../../../../fragments/modals/modalDocumentView";

export default function UpdateButtonModel() {
  return (
    <ModalDocumentView
      isAddForPrint
      isShowRegistrationInOOPZ
      isShowRoute
      isAbleToUploadFiles
      notificationType="Approved"
    />
  );
}
