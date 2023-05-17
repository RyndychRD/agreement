import { Button, Modal } from "antd";

/**
 * Стандартная ошибка при вызове несуществующего в pipeline модального окна
 * @param {string} props.currentModal Вызываемая форма
 * @param {*} props.onCancel Функция закрытия модального окна
 * @returns
 */
export default function ErrorPipelineModal(props) {
  const { currentModal, onCancel } = props;
  return (
    <Modal
      open
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Закрыть</Button>}
    >
      Форма {currentModal} не найдена
    </Modal>
  );
}
