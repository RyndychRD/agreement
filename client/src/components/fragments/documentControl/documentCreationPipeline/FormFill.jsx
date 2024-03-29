import { Form, Modal } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useGetTypeQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  HeaderTextOutput,
  MainDocumentInformation,
} from "../../outputs/textOutputs";
import {
  nextStep,
  saveCurrentStepJson,
  getPreviousStepJson,
  getCurrentStepJson,
  setStep,
  appendCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";
import { useGetDocumentIODictionaryElementsHook } from "../../../../core/redux/api/AdminSettings/Constructor/formConstructor/DocumentIODictionaryElementApi";
import FormBuilderDataComponent from "../../../formBuilder/RenderForm/FBRenderFormItem";
import TextInputFormItem from "../../inputs/textInputs";
import FragmentFileUploader from "../../file/FragmentFileUploader";
import FileService from "../../../../services/FileService";
import ModalConfirm from "../../modals/ModalConfirm";

/**
 * Модальное окно, в котором заполняются поля при создании документа
 * @param {*} props.onCancel Функция закрытия модального окна
 * @param {*} props.pipelineDispatch Диспатчер pipeline. Выведен для возможного использования нескольких пайплайнов
 * @param {*} props.documentMainValues Предполагается, что перед вызовом этой формы всегда заполняется главная страница. Для отображения главной информации в шапки каждого документа при создании сразу передаем эти значения
 * @returns
 */
export default function DocumentCreationPipelineFormFill(props) {
  const { onCancel, pipelineDispatch, documentMainValues } = props;
  const currentModalJson = useSelector(getCurrentStepJson);
  const [form] = Form.useForm();
  // Подразумевается, что предыдущий шаг всегда конструтор форм
  let elementsOrder = useSelector(getPreviousStepJson);
  // prettier-ignore
  const {data: type = "",isError: isErrorType,isLoading: isLoadingType} = useGetTypeQueryHook({ isStart: true, id: documentMainValues.typeId });
  // prettier-ignore
  const {data: DocumentIODictionaryElements = "",isError: isErrorDocumentIODictionary,isLoading: isLoadingDocumentIODictionary} = useGetDocumentIODictionaryElementsHook({  typeId: documentMainValues.typeId });

  // Мы подразумеваем что у нас никогда не пропускается этот шаг. Поэтому не реализована логика пропуска шага, как это сделано в конструктуре форм, к примеру

  // Если у нас уже есть сохраненные данные в pipeline, то выводим их. Иначе - стандартный вывод, если он нормально загрузился
  if (currentModalJson && Object.keys(currentModalJson).length > 0) {
    elementsOrder = currentModalJson?.formValues;
    form.setFieldsValue({
      documentName: currentModalJson?.documentName,
      // Значения в hidden input показывают к какому конкретно элементу конструктора относится value.
      elementsOrder: currentModalJson?.formValues,
      files: { fileList: currentModalJson?.fileList },
    });
  } else if (
    !isErrorDocumentIODictionary &&
    !isLoadingDocumentIODictionary &&
    !isLoadingType
  ) {
    form.setFieldsValue({
      elementsOrder: DocumentIODictionaryElements?.view?.elements_order,
    });
  }

  const findAndTransferAllDateToString = (values) =>
    Object.keys(values).reduce((acc, key) => {
      if (dayjs.isDayjs(values[key]?.value)) {
        acc[key] = {
          ...values[key],
          value: values[key].value.format("YYYY-MM-DD"),
        };
      } else {
        acc[key] = values[key];
      }
      return acc;
    }, {});

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
          formValues: findAndTransferAllDateToString(values),
        };
        form.resetFields();

        // Спасибо новым хотелкам Небогина, нам нужно сначала вернуться на первый шаг, дополнить именем договора первый шаг и вернуться обратно
        // Этот шаг служит только для отображения имени договора, его можно убрать и на логику это не повлияет
        pipelineDispatch(setStep(0));
        pipelineDispatch(appendCurrentStepJson({ documentName }));

        pipelineDispatch(setStep(2));
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
        <FragmentFileUploader
          fileList={
            currentModalJson?.fileList ? currentModalJson?.fileList : []
          }
          isRequired={type.is_file_upload_required}
        />
      </Form>
    </Modal>
  );
}
