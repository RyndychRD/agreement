import { Form, Modal } from "antd";
import { useSelector } from "react-redux";
import { useGetTypeQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import {
  getCurrentStepJson,
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import FBConstructForm from "../../../formBuilder/ElementsFormBuilder/FBCustomInput";
import { useGetDocumentTypeViewByDocumentTypeHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentTypesViewsApi";
import RestoreButton from "./RestoreButton";
import SimpleSpinner from "../../messages/Spinner";

/**
 * Модальное окно, в котором собираются поля для заполнения. То бишь собирается список полей для заполнения пользователя
 * @param {*} props.onCancel Функция закрытия модального окна
 * @param {*} props.pipelineDispatch Диспатчер pipeline. Выведен для возможного использования нескольких пайплайнов
 * @param {*} props.documentMainValues Предполагается, что перед вызовом этой формы всегда заполняется главная страница. Для отображения главной информации в шапки каждого документа при создании сразу передаем эти значения
 * @returns
 */
export default function DocumentCreationPipelineFormConstruct(props) {
  const { onCancel, pipelineDispatch, documentMainValues } = props;
  const currentModalJson = useSelector(getCurrentStepJson);
  const [form] = Form.useForm();
  // prettier-ignore
  const {data: type = "",isError: isErrorType,isLoading: isLoadingType} = useGetTypeQueryHook({ isStart: true, id: documentMainValues.typeId });
  // prettier-ignore
  const {data: DocumentTypeViewByDocumentType = "",isError: isErrorDocumentTypeView,isLoading: isLoadingDocumentTypeView} = useGetDocumentTypeViewByDocumentTypeHook({  typeId: documentMainValues.typeId });

  // Для всех типов создания документа мы проверяем доступность этого шага
  // Если шаг не доступен, запоминаем дефолтные значения и пропускаем
  if (
    !isErrorDocumentTypeView &&
    !isLoadingDocumentTypeView &&
    !isLoadingType &&
    !type.is_form_construct_available
  ) {
    const clearedValues = DocumentTypeViewByDocumentType?.view?.elements_order;
    pipelineDispatch(saveCurrentStepJson(clearedValues));
    pipelineDispatch(nextStep());
    return "";
  }

  // Если у нас уже есть сохраненные данные в pipeline, то выводим их. Иначе - стандартный вывод, если он нормально загрузился
  if (currentModalJson && Object.keys(currentModalJson).length > 0) {
    form.setFieldsValue({
      elementsOrder: currentModalJson,
    });
  } else if (
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

  if (isLoadingType) {
    return (
      <Modal open footer={[]}>
        Подождите, данные подгружаются
        <SimpleSpinner />
      </Modal>
    );
  }

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
