import { Form } from "antd";
import DocumentTasksShowBlock from "../../../../../fragments/documentControl/documentTasks/DocumentTasksShow";
import { LargeTextInputFormItem } from "../../../../../fragments/inputs/textInputs";
import FragmentFileUploader from "../../../../../fragments/file/FragmentFileUploader";
import DocumentTaskSecondListZakupTRU from "../../../../../fragments/documentControl/documentTasks/buttonModals/documentTaskExtraFields/DocumentTaskSecondListZakupTRU";
import DocumentTaskDocumentRegistration from "../../../../../fragments/documentControl/documentTasks/buttonModals/documentTaskExtraFields/DocumentTaskDocumentRegistration";
import { useGetDocumentValuesQueryHook } from "../../../../../../core/redux/api/DocumentControl/DocumentApi";
import SimpleSpinner from "../../../../../fragments/messages/Spinner";

export default function UpdateForm({ form, rawData }) {
  let content = "";

  const {
    data = {},
    isLoading,
    isError,
  } = useGetDocumentValuesQueryHook({
    isStart: true,
    documentId: rawData.document_id,
    isGetConnectedTables: true,
  });

  switch (rawData.document_task_type_id) {
    /* Если это Поручение для 2 листа согласования Закупа ТРУ */
    case 2:
      if (!isLoading && !isError) {
        data.forEach((documentValue) => {
          if (
            [
              "fullNameOfTheItemInBudget",
              "contractSumNoNDS",
              "contractSumWithNDS",
              "currentNDS",
            ].includes(documentValue.key)
          ) {
            form.setFieldValue(documentValue.key, documentValue.value);
          }
        });
        content = <DocumentTaskSecondListZakupTRU form={form} />;
      } else {
        content = <SimpleSpinner />;
      }
      break;
    case 3:
      content = <DocumentTaskDocumentRegistration form={form} />;
      break;
    default:
      content = (
        <LargeTextInputFormItem
          name="result"
          rules={[
            {
              required: true,
              message: "Выберите получателя",
            },
          ]}
          title="Результат"
        />
      );
      break;
  }
  return (
    <>
      <DocumentTasksShowBlock rawData={rawData} />
      <Form form={form}>
        {content}
        <FragmentFileUploader isRequired={false} />
      </Form>
    </>
  );
}
