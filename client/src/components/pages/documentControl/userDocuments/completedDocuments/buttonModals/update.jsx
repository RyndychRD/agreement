import ModalDocumentView from "../../../../../fragments/modals/modalDocumentView";

export default function UpdateButtonModel() {
  return (
    <ModalDocumentView
      notificationType="Completed"
      isShowRoute
      isShowRegistrationInOOPZ
      isShowToArchive
    />
  );
}
