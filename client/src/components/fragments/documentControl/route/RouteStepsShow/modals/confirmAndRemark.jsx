import { Form, Modal } from "antd";
import TextInputFormItem from "../../../../inputs/textInputs";
import {
  useRouteStepFragmentDispatch,
  useRouteStepFragmentState,
} from "../../RouteStepFragmentProvider";

function getMessage(type) {
  switch (type) {
    case "confirm":
      return "Вы уверены что хотите согласовать договор?";
    case "confirmWithRemark":
      return "Вы уверены что хотите согласовать договор с замечанием?";
    case "rejectWithRemark":
      return "Вы уверены что хотите НЕ согласовать договор?";
    default:
      return `Сообщение для типа ${type} не найдено`;
  }
}

function getRemarkIfNeeded(type, form) {
  switch (type) {
    case "confirmWithRemark":
    case "rejectWithRemark":
      return (
        <Form form={form}>
          <TextInputFormItem
            title="Замечание"
            name="remark"
            rules={[
              {
                required: true,
                message: "Введите название департамента",
              },
            ]}
          />
        </Form>
      );
    case "confirm":
      return "";
    default:
      return `Форма ввода для типа ${type} не найдено`;
  }
}

export default function ConfirmAndRemark() {
  const state = useRouteStepFragmentState();
  const dispatch = useRouteStepFragmentDispatch();

  const [form] = Form.useForm();
  return (
    <Modal
      onCancel={() => {
        dispatch("closeModal");
      }}
      okText="Сохранить"
      cancelText="Отмена"
      open={state.isOpen}
    >
      <div>
        <span>{getMessage(state.modalType)}</span>
      </div>

      {getRemarkIfNeeded(state.modalType, form)}
    </Modal>
  );
}
