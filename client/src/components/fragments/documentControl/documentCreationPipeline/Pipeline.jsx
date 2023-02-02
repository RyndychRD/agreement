import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
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

  // Просто плейсхолдер функции. По факту изменение returnValue ни на что не влияет
  function handleWindowClose(e) {
    e.preventDefault();
    e.returnValue = "123";
    return e;
  }

  const closeModal = () => {
    pipelineDispatch(clearDocumentCreation());
    tableDispatch({ type: "closeAllModal" });
    // Убрать подтверждение закрытия страницы
    window.onbeforeunload = null;
  };

  const onCancel = () =>
    Modal.confirm({
      title: "Подтверждение",
      content:
        "Вы точно хотите прекратить создание документа и потерять все заполненные данные?",
      onOk: closeModal,
      okText: "Да, я хочу потерять заполненные данные",
      cancelText: "Нет",
    });

  if (!isPipelineStarted) return null;
  // Добавить подтверждение закрытия страницы. Что то типа синглтона
  window.onbeforeunload = handleWindowClose;
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
