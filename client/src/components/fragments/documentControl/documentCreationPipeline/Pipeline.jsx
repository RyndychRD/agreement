import { useDispatch, useSelector } from "react-redux";
import {
  clearDocumentCreation,
  getCurrentStepModal,
  getFirstStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import DocumentCreationPipelineMainModal from "./MainModal";

import {
  useTableModalDispatch,
  useTableModalsState,
} from "../../tables/TableModalProvider";
import ErrorPipelineModal from "./Error";
import DocumentCreationPipelineRouteConstruct from "./RouteConstruct";
import DocumentPreview from "./DocumentPreview";
import DocumentCreationPipelineFormConstruct from "./FormConstruct";
import DocumentCreationPipelineFormFill from "./FormFill";

/**
 * @return Модальное окно для создания нового документа
 */
export default function DocumentCreationPipeline() {
  const tableState = useTableModalsState();
  const tableDispatch = useTableModalDispatch();
  const pipelineDispatch = useDispatch();

  const isPipelineStarted = tableState.isShowCreateModal;

  const currentModal = useSelector(getCurrentStepModal);
  const documentMainValues = useSelector(getFirstStepJson);
  const onCancel = () => {
    pipelineDispatch(clearDocumentCreation());
    tableDispatch({ type: "closeAllModal" });
  };

  if (!isPipelineStarted) return null;
  switch (currentModal) {
    case "MainModal":
      return (
        <DocumentCreationPipelineMainModal
          onCancel={onCancel}
          pipelineDispatch={pipelineDispatch}
        />
      );
    case "RouteConstruct":
      return (
        <DocumentCreationPipelineRouteConstruct
          onCancel={onCancel}
          pipelineDispatch={pipelineDispatch}
          documentMainValues={documentMainValues}
        />
      );
    case "DocumentPreview":
      return (
        <DocumentPreview
          onCancel={onCancel}
          pipelineDispatch={pipelineDispatch}
          documentMainValues={documentMainValues}
        />
      );
    case "FormConstruct":
      return (
        <DocumentCreationPipelineFormConstruct
          onCancel={onCancel}
          pipelineDispatch={pipelineDispatch}
          documentMainValues={documentMainValues}
        />
      );
    case "FormFill":
      return (
        <DocumentCreationPipelineFormFill
          onCancel={onCancel}
          pipelineDispatch={pipelineDispatch}
          documentMainValues={documentMainValues}
        />
      );
    default:
      return (
        <ErrorPipelineModal onCancel={onCancel} currentModal={currentModal} />
      );
  }
}
