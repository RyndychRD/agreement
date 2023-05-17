import { Form, Modal } from "antd";
import SelectInputFormItem from "../../inputs/selectInputs";
import { useGetTypesQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";

/**
 * Заполнение основной информации. Подразумевалось, что на этой форме вводится тип и название документа. Но этот функционал перекочевал в заполнение формы, спасибо Небогину
 * @param {*} props.pipelineDispatch Диспатчер пайплайна
 * @param {*} props.onCancel Функция закрытия модального окна
 * @returns
 */
export default function DocumentCreationPipelineMainModal(props) {
  const { onCancel, pipelineDispatch } = props;
  // prettier-ignore
  const {data: types = [], isError: isErrorTypes, isLoading: isLoadingTypes} = useGetTypesQueryHook({isShowOnlyForCreation:true});
  const [form] = Form.useForm();
  const onFinish = () => {
    form
      .validateFields()
      .then(async (values) => {
        const preparedValues = {
          typeId: values.typeId,
          typeName: types?.find((type) => type.id === values.typeId)?.name,
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
        <SelectInputFormItem
          isSortAlphabet={false}
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
      </Form>
    </Modal>
  );
}
