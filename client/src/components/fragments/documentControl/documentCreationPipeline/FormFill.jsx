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
        form.resetFields();
        pipelineDispatch(saveCurrentStepJson(values));
        pipelineDispatch(nextStep());
      })
      .catch((info) => {
        console.log("Ошибка на форме создания:", info);
      });
  };

  return (
    <Modal
      open
      onCancel={onCancel}
      onOk={onFinish}
      cancelText="Закрыть"
      okText="Далее"
    >
      <MainDocumentInformation
        isLoading={isLoadingType}
        isError={isErrorType}
        documentName={documentMainValues.documentName}
        typeName={type.name}
      />
      <HeaderTextOutput text="Заполнение формы" />
      <Form form={form} name="FormFill" key="FormFill">
        <FormBuilderDataComponent FormBuilderData={elementsOrder} form={form} />
      </Form>
    </Modal>
  );
}
