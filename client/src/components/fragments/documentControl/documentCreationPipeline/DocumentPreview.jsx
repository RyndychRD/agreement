import { Modal } from "antd";
import { useSelector } from "react-redux";
import { getSteps } from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import RouteStepsShow from "../documentRoute/RouteStepsShow/RouteStepsShow";
import { useAddDocumentMutationHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import ShowFilledDocumentInformation from "../documentInformation/documentInfromationShow";

const DOCUMENT_CREATION_STATUS = 5;

export default function DocumentPreview({ onCancel }) {
  const previewValues = useSelector(getSteps);
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
        preparedValuesToSave.documentName = element.json.documentName;
        preparedValuesToSave.documentTypeId = element.json.typeId;
        preparedValuesToSave.documentStatusId = DOCUMENT_CREATION_STATUS;
        break;
      case "RouteConstruct":
        result.push(
          <RouteStepsShow
            key="RouteConstruct"
            routeSteps={element.json}
            isAbleToSign={false}
          />
        );
        preparedValuesToSave.documentRoute = element.json.map((routeStep) => ({
          signerId: routeStep.signer_id,
          step: routeStep.step,
        }));
        break;
      case "FormFill":
        result.push(<ShowFilledDocumentInformation key="FormFill" />);
        preparedValuesToSave.documentFilledInformation = element.json;
        break;
      default:
    }
  });

  const onFinish = () => {
    addDocument(preparedValuesToSave).unwrap();
    if (isError) {
      reset();
    }
  };
  return (
    <Modal
      open
      onOk={onFinish}
      onCancel={onCancel}
      cancelText="Закрыть"
      okText="Сохранить"
    >
      <span>{JSON.stringify(preparedValuesToSave)}</span>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      <HeaderTextOutput text="Предпросмотр документа перед сохранением" />
      {result}
    </Modal>
  );
}
