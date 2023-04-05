import { Form, Modal } from "antd";
import { useSelector } from "react-redux";
import { useGetTypeQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import {
  nextStep,
  saveCurrentStepJson,
  getPreviousStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import { useGetDocumentIODictionaryElementsHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import FormBuilderDataComponent from "../../../formBuilder/RenderForm/FBRenderFormItem";
import TextInputFormItem from "../../inputs/textInputs";
import FragmentFileUploader from "../../file/FragmentFileUploader";
import FileService from "../../../../services/FileService";
import ModalConfirm from "../../modals/ModalConfirm";

/**
 * @return Модальное окно для создания нового документа
 */
export default function DocumentCreationPipelineFormFill({
  onCancel,
  pipelineDispatch,
  documentMainValues,
}) {
  const [form] = Form.useForm();
  // Подразумевается, что предыдущий шаг всегда конструтор форм
  const elementsOrder = useSelector(getPreviousStepJson);
  // prettier-ignore
  const {data: type = "",isError: isErrorType,isLoading: isLoadingType} = useGetTypeQueryHook({ isStart: true, id: documentMainValues.typeId });
  // prettier-ignore
  const {data: DocumentIODictionaryElements = "",isError: isErrorDocumentIODictionary,isLoading: isLoadingDocumentIODictionary} = useGetDocumentIODictionaryElementsHook({  typeId: documentMainValues.typeId });

  if (
    !isErrorDocumentIODictionary &&
    !isLoadingDocumentIODictionary &&
    !isLoadingType
  ) {
    form.setFieldsValue({
      elementsOrder: DocumentIODictionaryElements?.view?.elements_order,
    });
  }

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { documentName } = values;
        // Передаем почти все значения файла, чтобы потом их использовать в предпросмотре. Удалил только не сериализуемые элементы
        const fileList = FileService.prepareFileListFromFormToSend(values);
        // eslint-disable-next-line no-param-reassign
        delete values.documentName;
        // eslint-disable-next-line no-param-reassign
        delete values.files;
        const preparedValues = {
          documentName,
          fileList,
          formValues: { ...values },
        };
        form.resetFields();
        pipelineDispatch(saveCurrentStepJson(preparedValues));
        pipelineDispatch(nextStep());
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  const confirmModal = () =>
    ModalConfirm({
      content:
        "Вы уверены что данные введены корректно? Вернуться к этой форме вы уже не сможете",
      onOk: onFinish,
      okText: "Да, данные введены корректно",
      cancelText: "Нет",
    });

  return (
    <Modal
      open
      onCancel={onCancel}
      onOk={confirmModal}
      cancelText="Закрыть"
      okText="Далее"
    >
      <MainDocumentInformation
        isLoading={isLoadingType}
        isError={isErrorType}
        // documentName={documentMainValues.documentName}
        typeName={type.name}
      />

      <Form form={form} name="FormFill" key="FormFill">
        <HeaderTextOutput text="Ввод наименования договора" />
        <TextInputFormItem
          title="Наименование договора"
          name="documentName"
          rules={[
            {
              required: true,
              message: "Введите наименование договора",
            },
          ]}
        />
        <HeaderTextOutput text="Заполнение формы" />
        <FormBuilderDataComponent FormBuilderData={elementsOrder} form={form} />
        <FragmentFileUploader isRequired={type.is_file_upload_required} />
      </Form>
    </Modal>
  );
}
