import { Button } from "antd";
import { useState } from "react";
// import { SimpleTextOutput } from "../../outputs/textOutputs";
// import { renderDate } from "../../tables/CommonFunctions";
import DocumentSetArchiveModal from "./buttons/documentSetArchiveModal";

/**
 * Кнопка перемещения в архив
 * @param {*} props.document объект документа
 * @param {*} props.closeMainModal функция закрытия родительского окна
 * @returns
 */
export default function DocumentToArchiveShow(props) {
  const { document, closeMainModal } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* <SimpleTextOutput
        text={`Документ будет автоматически перемещен ${renderDate(
          document.document_archive_pass_by,
          false
        )} в архив ${document.document_archive_type_name}`}
      /> */}
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
