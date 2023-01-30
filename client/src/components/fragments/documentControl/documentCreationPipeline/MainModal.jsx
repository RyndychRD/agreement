import { Form, Modal } from "antd";
import TextInputFormItem from "../../inputs/textInputs";
import SelectInputFormItem from "../../inputs/selectInputs";
import { useGetTypesQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import FileInput from "../../file/FragmentFileUploader";

/**
 * @return Модальное окно для создания нового документа
 */
export default function DocumentCreationPipelineMainModal({
  onCancel,
  pipelineDispatch,
}) {
  // prettier-ignore
  const {data: types = [], isError: isErrorTypes, isLoading: isLoadingTypes} = useGetTypesQueryHook();
  const [form] = Form.useForm();
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = {
          documentName: values.documentName,
          typeId: values.typeId,
          typeName: types?.find((type) => type.id === values.typeId)?.name,
          // Передаем почти все значения файла, чтобы потом их использовать в предпросмотре. Удалил только не сериализуемые элементы
          fileList: values.files.fileList.map((file) => ({
            ...file,
            // Вытаскиваем из респонса uuid, под которым сохранен файл
            uniq: file.response.savedFileName,
            lastModifiedDate: null,
            originFileObj: null,
            xhr: null,
          })),
        };
        form.resetFields();
        pipelineDispatch(saveCurrentStepJson(preparedValues));
        pipelineDispatch(nextStep());
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };
  return (
    <Modal
      open
      onOk={onFinish}
      onCancel={onCancel}
      cancelText="Закрыть"
      okText="Далее"
    >
      <Form form={form} name="document_creation_main_modal" autoComplete="off">
        <TextInputFormItem
          title="Наименование документа"
          name="documentName"
          rules={[
            {
              required: true,
              message: "Введите наименование документа",
            },
          ]}
        />
        <SelectInputFormItem
          title="Тип документа"
          isLoading={isLoadingTypes}
          isError={isErrorTypes}
          name="typeId"
          options={types}
          rules={[
            {
              required: true,
              message: "Выберите тип документа",
            },
          ]}
        />
        <FileInput />
      </Form>
    </Modal>
  );
}
