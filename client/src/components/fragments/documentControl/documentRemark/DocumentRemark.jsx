import DocumentReworkButtons from "./buttons/DocumentRework";
import {
  HeaderTextOutput,
  TextOutputWithLabel,
} from "../../outputs/textOutputs";

function DocumentRemarkText(props) {
  const { text } = props;
  return (
    <>
      <HeaderTextOutput
        text="Замечание по документу"
        key="documentRemarkHeader"
      />
      <TextOutputWithLabel label="Замечание" text={text} key="documentRemark" />
    </>
  );
}

export default function DocumentRemark(props) {
  const { documentStatusId, documentRemark } = props;
  const result = [];
  // Отклонен
  if (
    (documentStatusId === 2 || documentStatusId === 7) &&
    documentRemark?.length > 0
  ) {
    result.push(
      <DocumentRemarkText key="documentRemarkText" text={documentRemark} />
    );
  }
  // На доработку
  if (documentStatusId === 7 && documentRemark?.length > 0) {
    result.push(
      <DocumentReworkButtons key="documentRemarkButton" text={documentRemark} />
    );
  }
  return result;
}
