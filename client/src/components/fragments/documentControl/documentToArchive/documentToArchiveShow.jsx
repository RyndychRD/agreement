import { Button } from "antd";
import { useState } from "react";
import { SimpleTextOutput } from "../../outputs/textOutputs";
import DocumentToArchiveModal from "./buttons/documentToArchiveModal";

export default function DocumentToArchiveShow(props) {
  const { document, closeMainModal } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <SimpleTextOutput text="Автоматическое перемещение в архив пока не реализовано. Необходимо при перемещении документа в Исполненные добавить поле в какой архив надо послать документ" />
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Переместить в архив
      </Button>
      <DocumentToArchiveModal
        document={document}
        closeParentModalFunc={closeMainModal}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
}
