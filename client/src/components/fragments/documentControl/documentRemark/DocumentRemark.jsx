import { Alert } from "antd";
import {
  HeaderTextOutput,
  TextOutputWithLabel,
} from "../../outputs/textOutputs";
import { useGetDocumentRouteQueryHook } from "../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../messages/Spinner";
import SimpleError from "../../messages/Error";
import { userNameWithPositionMask } from "../../../../services/CommonFunctions";

function DocumentRemarkText(props) {
  const { text } = props;
  return <Alert message={text} type="error" />;
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
  if (documentStatusId === 2) {
    result.push(
      <HeaderTextOutput text="Причина отклонения" key="documentRemarkHeader" />
    );

    // Текст замечания
    if (documentRemark?.length > 0) {
      const cardDataPassed = userNameWithPositionMask(currentSignStep.signer);

      result.push(
        <DocumentRemarkText key="documentRemarkText" text={documentRemark} />
      );
      result.push(
        <TextOutputWithLabel label="Отклонивший" text={cardDataPassed} />
      );
    } else {
      result.push(
        <DocumentRemarkText
          key="documentRemarkText"
          text="Замечание по документу не найдено"
        />
      );
    }
  }
  return result;
}
