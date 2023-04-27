import ModalDocumentView from "../../../../../fragments/modals/modalDocumentView";

export default function UpdateButtonModel() {
  return (
    <ModalDocumentView
      notificationType="ProcessingDocument"
      isShowRoute
      isShowRegistrationInOOPZ
      isShowComplete
    />
  );
}
