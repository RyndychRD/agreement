import { Button } from "antd";
import { useState } from "react";
import { SimpleTextOutput } from "../../outputs/textOutputs";
import DocumentSetArchiveModal from "./buttons/documentSetArchiveModal";

export default function DocumentToArchiveShow(props) {
  const { document, closeMainModal } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <SimpleTextOutput text="Автоматическое перемещение в архив пока не реализовано" />
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Переместить в архив
      </Button>
      <DocumentSetArchiveModal
        document={document}
        closeParentModalFunc={closeMainModal}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
}
