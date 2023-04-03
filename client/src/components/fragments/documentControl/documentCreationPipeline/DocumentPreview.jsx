import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDocumentCreation,
  getSteps,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import RouteStepsShow from "../documentRoute/RouteStepsShow/RouteStepsShow";
import { useAddDocumentMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import DocumentInformationShow from "../documentInformation/DocumentInformationShow";
import { useTableModalDispatch } from "../../tables/TableModalProvider";
import DocumentFilesShow from "../documentFiles/DocumentFilesShow";

const DOCUMENT_CREATION_STATUS = 5;

export default function DocumentPreview({ onCancel }) {
  const previewValues = useSelector(getSteps);
  const tableDispatch = useTableModalDispatch();
  const pipelineDispatch = useDispatch();
  const result = [];
  const preparedValuesToSave = {};

  const [addDocument, { isError, isLoading, reset }] =
    useAddDocumentMutationHook();

  previewValues.forEach((element) => {
    switch (element.modal) {
      case "MainModal":
        result.push(
          <MainDocumentInformation
            key="MainModal"
            documentName={element.json.documentName}
            typeName={element.json.typeName}
          />
        );

        preparedValuesToSave.documentTypeId = element.json.typeId;
        preparedValuesToSave.documentStatusId = DOCUMENT_CREATION_STATUS;
        break;
      case "RouteConstruct":
        result.push(
          <>
            <HeaderTextOutput text="Маршрут документа" />
            <RouteStepsShow
              key="RouteConstruct"
              routeSteps={element.json}
              isAbleToSign={false}
            />
          </>
        );
        preparedValuesToSave.documentRoute = element.json?.map((routeStep) => ({
          signerId: routeStep.signer_id,
          step: routeStep.step,
        }));
        break;
      case "FormFill":
        result.push(
          <>
            <HeaderTextOutput text="Данные документа" />
            <DocumentInformationShow
              data={Object.values(element.json.formValues)}
              isPrepareData={false}
            />
          </>
        );
        result.push(
          <>
            <HeaderTextOutput
              text="Загруженные файлы"
              key="uploadedFilesListHeader"
            />
            <DocumentFilesShow
              key="FilesUploaded"
              fileList={element.json.fileList}
            />
          </>
        );

        preparedValuesToSave.documentName = element.json.documentName;
        preparedValuesToSave.documentFileIds = element.json.fileList.map(
          (file) => file.response.fileId
        );
        preparedValuesToSave.documentFilledInformation = Object.values(
          element.json.formValues
        );
        break;
      default:
    }
  });

  const onFinish = () => {
    addDocument(preparedValuesToSave).unwrap();
    tableDispatch({ type: "closeAllModal" });
    pipelineDispatch(clearDocumentCreation());
    if (isError) {
      console.log("При добавлении документа возникла ошибка");
      reset();
    }
  };
  const confirmModal = () =>
    Modal.confirm({
      title: "Подтверждение",
      content: "Вы уверены что хотите создать документ с такими данными?",
      onOk: onFinish,
      okText: "Да, я хочу создать новый документ",
      cancelText: "Нет",
    });
  return (
    <Modal
      open
      onOk={confirmModal}
      onCancel={onCancel}
      cancelText="Закрыть"
      okText="Сохранить"
    >
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      <HeaderTextOutput text="Предпросмотр документа перед сохранением" />
      {result}
    </Modal>
  );
}
