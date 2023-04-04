import { Form, Modal } from "antd";
import SelectInputFormItem from "../../inputs/selectInputs";
import { useGetTypesQueryHook } from "../../../../core/redux/api/Globals/Catalogs/TypeApi";
import {
  nextStep,
  saveCurrentStepJson,
} from "../../../../core/redux/reducers/documentCreationPipelineReducer";

/**
 * @return Модальное окно для создания нового документа
 */
export default function DocumentCreationPipelineMainModal({
  onCancel,
  pipelineDispatch,
}) {
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
