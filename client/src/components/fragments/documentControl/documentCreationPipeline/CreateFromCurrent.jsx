import { Button, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import ModalConfirm from "../../modals/ModalConfirm";
import {
  useTableModalDispatch,
  useTableModalsState,
} from "../../tables/TableModalProvider";
import {
  saveCurrentStepJson,
  setStep,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import {
  useGetDocumentFilesQueryHook,
  useGetDocumentRouteQueryHook,
  useGetDocumentValuesQueryHook,
} from "../../../../core/redux/api/DocumentControl/DocumentApi";

/**
 * Форма, которая заполняет данными pipeline создания документа на основе существующего
 * Работает относительно выбранного currentRow из провайдера
 * @returns
 */
export default function CreateFromCurrent() {
  const dispatch = useTableModalDispatch();
  const state = useTableModalsState();
  const pipelineDispatch = useDispatch();

  const documentId = state.currentRow?.document_id;

  // Так как мы сначала открываем документ, то эти данные уже кешированы
  const { data = {} } = useGetDocumentValuesQueryHook({
    isStart: true,
    documentId,
    isGetConnectedTables: true,
  });
  // Так как мы сначала открываем документ, то эти данные уже кешированы
  const { data: routeSteps = {} } = useGetDocumentRouteQueryHook({
    documentId,
    isStart: true,
  });
  // Так как мы сначала открываем документ, то эти данные уже кешированы
  const { data: documentFiles = {} } = useGetDocumentFilesQueryHook({
    isStart: true,
    documentId,
  });

  // Начинаем на 0 шаге, переходим к шагу 1 после заполнения
  // На этом шаге мы заполняем тип документа
  const fillFirstStep = async () => {
    const firstStepValues = {
      typeId: state.currentRow.document_type_id,
      typeName: state.currentRow.document_type,
    };
    pipelineDispatch(saveCurrentStepJson(firstStepValues));
    pipelineDispatch(setStep(1));
  };

  // Заполняем данными конструктор, даже если для выбранного типа мы его пропускаем. Сделал так для реализации шаблонизатора в будущем
  const fillSecondStep = async () => {
    const secondStepValues = data.map((el) => ({
      label: el.label,
      key: el.key,
    }));
    pipelineDispatch(saveCurrentStepJson(secondStepValues));
    pipelineDispatch(setStep(2));
  };

  // Заполняем значениями полученную из конструктора форму
  // TODO: Доделать файлы
  const fillThirdStep = async () => {
    const thirdStepValues = {
      documentName: state.currentRow?.document_name,
      fileList: documentFiles.map((file) => ({
        uid: file.uniq,
        response: { savedFileName: file.uniq, fileId: file.file_id },
        name: file.name,
        status: "done",
        percent: 100,
        file_id: file.file_id,
        path: file.path,
        isAlreadyExist: true,
      })),
      formValues: data.map((el) => ({
        label: el.label,
        key: el.key,
        value: el.value,
        select_name: el.value,
      })),
    };
    pipelineDispatch(saveCurrentStepJson(thirdStepValues));
    pipelineDispatch(setStep(3));
  };
  const fillFourthStep = async () => {
    const fourthStepValues = {
      route: routeSteps.map((routeStep) => ({
        specified_signer_id: routeStep.signer_id,
      })),
    };
    pipelineDispatch(saveCurrentStepJson(fourthStepValues));
    pipelineDispatch(setStep(4));
  };

  // Здесь мы должны сначала заполнить необходимые шаги по пайплайну, потом отобразить пользователю с помощью DocumentPreview
  const createFromCurrent = async () => {
    // Сначала загружаем всю необходимую информацию
    await fillFirstStep();
    await fillSecondStep();
    await fillThirdStep();
    await fillFourthStep();
    pipelineDispatch(setStep(1));
    dispatch({ type: "openCreateModal" });
  };

  return (
    <Row className="mt-5">
      <Col push={5}>
        <Button
          onClick={() => {
            ModalConfirm({
              content:
                "Вы действительно хотите создать новый документ на основе существующего?",
              onOk: () => {
                createFromCurrent();
              },
            });
          }}
          type="primary"
        >
          Создать новый документ на основе существующего
        </Button>
      </Col>
    </Row>
  );
}
