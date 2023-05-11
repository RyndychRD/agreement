import ModalDocumentView from "../../../../../fragments/modals/modalDocumentView";

export default function UpdateButtonModel() {
  return (
    <ModalDocumentView
      isShowRoute
      isCreateFromCurrent
      notificationType="Rejected"
    />
  );
}
