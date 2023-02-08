import { Form } from "antd";
import { useGetUsersQueryHook } from "../../../../../core/redux/api/Globals/Catalogs/UserApi";
import { getUserNameAndPositionOptionsForSelect } from "../../../../../services/CommonFunctions";
import SelectInputFormItem from "../../../inputs/selectInputs";
import DateInputFormItem from "../../../inputs/dateInput";
import { LargeTextInputFormItem } from "../../../inputs/textInputs";
import {
  useGetDocumentValuesQueryHook,
  useGetDocumentFilesQueryHook,
} from "../../../../../core/redux/api/DocumentControl/DocumentApi";
import { CheckboxGroupInputFormItem } from "../../../inputs/checkboxInputs";
import DocumentValuesService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentValuesService";
import { TextOutputWithLabel } from "../../../outputs/textOutputs";
import { UploadListItem } from "../../../file/fileOutputs";

function prepareDocumentValuesForCheckbox(documentValues) {
  return documentValues.map((documentValue) => {
    const parsedDocumentValue =
      DocumentValuesService.getValueAndLabelFromDocumentValue(documentValue);
    return {
      value: documentValue.id,
      label: (
        <TextOutputWithLabel
          label={parsedDocumentValue.label}
          text={parsedDocumentValue.value}
        />
      ),
    };
  });
}
function prepareDocumentFilesForCheckbox(documentFiles) {
  return documentFiles.map((documentFile) => ({
    value: documentFile.file_id,
    label: (
      <UploadListItem
        key={documentFile.id}
        file={documentFile}
        isTempFile={false}
      />
    ),
  }));
}

export default function CreateForm({ form, documentId }) {
  const {
    data: users = [],
    isError: isErrorUsers,
    isLoading: isLoadingUsers,
  } = useGetUsersQueryHook({ isAddForeignTables: true });
  const {
    data: documentValues = {},
    isLoading: isLoadingValues,
    isError: isErrorValues,
  } = useGetDocumentValuesQueryHook({
    documentId,
    isGetConnectedTables: true,
  });
  const {
    data: documentFiles = {},
    isLoading: isLoadingFiles,
    isError: isErrorFiles,
  } = useGetDocumentFilesQueryHook({ documentId });
  let preparedDocumentValues = [];
  let preparedDocumentFiles = [];
  if (!(isLoadingValues || isErrorValues)) {
    preparedDocumentValues = prepareDocumentValuesForCheckbox(documentValues);
  }
  if (!(isLoadingFiles || isErrorFiles)) {
    preparedDocumentFiles = prepareDocumentFilesForCheckbox(documentFiles);
  }
  return (
    <Form form={form}>
      <Form.Item hidden name="documentId" />
      <SelectInputFormItem
        title="Получатель"
        isLoading={isLoadingUsers}
        isError={isErrorUsers}
        name="executorId"
        options={getUserNameAndPositionOptionsForSelect(users, false, false)}
        rules={[
          {
            required: true,
            message: "Выберите получателя",
          },
        ]}
      />
      <DateInputFormItem
        name="dueAt"
        title="Срок исполнения до"
        rules={[
          {
            required: true,
            message: "Выберите получателя",
          },
        ]}
        form={form}
      />
      <LargeTextInputFormItem
        key="problem"
        name="problem"
        rules={[
          {
            required: true,
            message: "Выберите получателя",
          },
        ]}
        title="Задача"
      />
      <CheckboxGroupInputFormItem
        isError={isErrorValues}
        isLoading={isLoadingValues}
        key="documentPassedValues"
        name="documentPassedValues"
        options={preparedDocumentValues}
        title="Данные из документа, отображаемые для исполнителя"
      />
      <CheckboxGroupInputFormItem
        isError={isLoadingFiles}
        isLoading={isErrorFiles}
        key="documentPassedFiles"
        name="documentPassedFiles"
        options={preparedDocumentFiles}
        title="Файлы из документа, отображаемые для исполнителя"
      />
    </Form>
  );
}
