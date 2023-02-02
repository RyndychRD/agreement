import { Form, Modal } from "antd";
import { useGetTypeQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import {
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import FBConstructForm from "../../../formBuilder/ElementsFormBuilder/FBCustomInput";
import { useGetDocumentTypeViewByDocumentTypeHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
import RestoreButton from "./RestoreButton";

/**
 * @return Модальное окно для создания нового документа
 */
export default function DocumentCreationPipelineFormConstruct({
  onCancel,
  pipelineDispatch,
  documentMainValues,
}) {
  const [form] = Form.useForm();
  // prettier-ignore
  const {data: type = "",isError: isErrorType,isLoading: isLoadingType} = useGetTypeQueryHook({ isStart: true, id: documentMainValues.typeId });
  // prettier-ignore
  const {data: DocumentTypeViewByDocumentType = "",isError: isErrorDocumentTypeView,isLoading: isLoadingDocumentTypeView} = useGetDocumentTypeViewByDocumentTypeHook({  typeId: documentMainValues.typeId });

  if (
    !isErrorDocumentTypeView &&
    !isLoadingDocumentTypeView &&
    !isLoadingType
  ) {
    form.setFieldsValue({
      elementsOrder: DocumentTypeViewByDocumentType?.view?.elements_order,
    });
  }

  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        pipelineDispatch(saveCurrentStepJson(values.elementsOrder));
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
      <HeaderTextOutput text="Конструктор формы" />
      <RestoreButton
        isShow={
          !(
            isLoadingDocumentTypeView ||
            isLoadingType ||
            isErrorDocumentTypeView
          )
        }
        onClick={() => {
          form.setFieldsValue({
            elementsOrder: DocumentTypeViewByDocumentType?.view?.elements_order,
          });
        }}
      />
      <Form form={form} name="">
        <FBConstructForm
          isError={isErrorDocumentTypeView}
          isLoading={isLoadingDocumentTypeView || isLoadingType}
        />
      </Form>
    </Modal>
  );
}
