import { Modal } from "antd";

/**
 * Стандартное модальное окно с подтверждение действия пользователя
 * @param {*} props.title
 * @param {*} props.content
 * @param {*} props.okText
 * @param {*} props.cancelText
 * @param {*} props.onOk  Действие при подтверждении
 * @param {*} props.onCancel Действие при отклонении
 * @returns
 */
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
