import ReactToPrint from "react-to-print";
import { useRef, useState } from "react";
import { Button } from "antd";
import { HeaderTextOutput } from "../../outputs/textOutputs";
import ApprovedPrintFile from "./ApprovedPrintFile";

/**
 * Отображает кнопку для выгрузки листа согласования и собирает печатную форму листа согласования
 * Кнопка изначально блокирована, пока лист согласования не готов полностью для выгрузки
 * @param {*} props.documentId id документа, по которому будет создан лист согласования
 * @returns
 */
export default function DocumentPrintFragment(props) {
  const { documentId } = props;
  const componentRef = useRef(null);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const trigger = () => (
    <Button disabled={!isComponentLoaded}>Получить лист согласования</Button>
  );

  return (
    <>
      <HeaderTextOutput text="Файл согласованного договора" />
      <ReactToPrint trigger={trigger} content={() => componentRef.current} />
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ApprovedPrintFile
            documentId={documentId}
            isStart
            setIsComponentLoaded={setIsComponentLoaded}
            isComponentLoaded={isComponentLoaded}
          />
        </div>
      </div>
    </>
  );
}
