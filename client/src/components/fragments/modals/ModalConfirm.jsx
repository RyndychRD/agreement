import { Modal } from "antd";

export default function ModalConfirm(props) {
  const {
    title = "Подтверждение",
    content = "Вы подтверждаете последнее действие?",
    okText = "Да",
    cancelText = "Нет",
    onOk = () => {},
    onCancel = () => {},
  } = props;
  return Modal.confirm({
    title,
    content,
    onOk,
    okText,
    cancelText,
    onCancel,
  });
}
