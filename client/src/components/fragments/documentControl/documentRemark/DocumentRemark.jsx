import { Alert } from "antd";
import DocumentReworkButtons from "./buttons/DocumentRework";
import {
  HeaderTextOutput,
  TextOutputWithLabel,
} from "../../outputs/textOutputs";
import { useGetDocumentRouteQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { userNameWithPositionMask } from "../../../../services/CommonFunctions";

function DocumentRemarkText(props) {
  const { text, documentStatusId } = props;
  return (
    <Alert message={text} type={documentStatusId === 7 ? "warning" : "error"} />
  );
}

export default function DocumentRemark(props) {
  const { documentStatusId, documentRemark, documentId, isStart } = props;
  const result = [];
  const {
    data: routeSteps = {},
    isLoading,
    isError,
  } = useGetDocumentRouteQueryHook({
    documentId,
    isStart,
  });
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;

  const currentSignStep = routeSteps?.filter((el) => !el.actual_signer_id)[0];
  if (documentStatusId === 2 || documentStatusId === 7) {
    result.push(
      <HeaderTextOutput
        text="Замечание по документу"
        key="documentRemarkHeader"
      />
    );

    // Текст замечания
    if (documentRemark?.length > 0) {
      const cardDataPassed =
        userNameWithPositionMask(currentSignStep.deputy_signer) ||
        userNameWithPositionMask(currentSignStep.signer);

      result.push(
        <DocumentRemarkText
          key="documentRemarkText"
          documentStatusId={documentStatusId}
          text={documentRemark}
        />
      );
      result.push(
        <TextOutputWithLabel
          label="Создатель замечания"
          text={cardDataPassed}
        />
      );
    } else {
      result.push(
        <DocumentRemarkText
          key="documentRemarkText"
          documentStatusId={documentStatusId}
          text="Замечание по документу не найдено"
        />
      );
    }
    // Добавление кнопки Замечание исправлено
    if (documentStatusId === 7 && documentRemark?.length > 0) {
      result.push(
        <DocumentReworkButtons
          key="documentRemarkButton"
          text={documentRemark}
        />
      );
    }
  }
  return result;
}
