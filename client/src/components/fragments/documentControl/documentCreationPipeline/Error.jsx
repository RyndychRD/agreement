import { Button, Modal } from "antd";

export default function ErrorPipelineModal({ currentModal, onCancel }) {
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
