import { Alert } from "antd";
import DocumentReworkButtons from "./buttons/DocumentRework";
import { HeaderTextOutput } from "../../outputs/textOutputs";

function DocumentRemarkText(props) {
  const { text, documentStatusId } = props;
  return (
    <Alert message={text} type={documentStatusId === 7 ? "warning" : "error"} />
  );
}

export default function DocumentRemark(props) {
  const { documentStatusId, documentRemark } = props;
  const result = [];
  if (documentStatusId === 2 || documentStatusId === 7) {
    result.push(
      <HeaderTextOutput
        text="Замечание по документу"
        key="documentRemarkHeader"
      />
    );

    // Текст замечания
    if (documentRemark?.length > 0) {
      result.push(
        <DocumentRemarkText
          key="documentRemarkText"
          documentStatusId={documentStatusId}
          text={documentRemark}
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
