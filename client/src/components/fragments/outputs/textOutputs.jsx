import SimpleSpinner from "../messages/Spinner";
import SimpleError from "../messages/Error";

/**
 * Компонент для вывода обычного текста в <p>
 * @param {*} props.isLoading
 * @param {*} props.isError
 * @param {*} props.text
 * @returns
 */
export function SimpleTextOutput(props) {
  const { isLoading, isError, text = "Текст не передан" } = props;
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return <p>{text}</p>;
}

/**
 * Компонент для вывода обычного текста в формате label:text
 * @param {*} props.isLoading
 * @param {*} props.isError
 * @param {*} props.text
 * @param {*} props.label
 * @param {*} props.className css класс для всего элемента
 * @param {*} props.keyIn ключ для react
 * @returns
 */
export function TextOutputWithLabel(props) {
  const {
    isLoading,
    isError,
    text = "Текст не передан",
    label = "Название не передано",
    className = {},
    keyIn,
  } = props;
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <div key={keyIn} className={className}>
      <span>
        {label}: {text}
      </span>
    </div>
  );
}

/**
 * Вывод текста в h3
 * @param {*} props.isLoading
 * @param {*} props.isError
 * @param {*} props.text
 * @returns
 */
export function HeaderTextOutput(props) {
  const { isLoading, isError, text = "Текст не передан" } = props;
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return <h3 className="mt-5">{text}</h3>;
}

/**
 * Стандартная форма вывода заглавной информации о документе
 * @param {*} props.isLoading
 * @param {*} props.isError
 * @param {*} props.documentName
 * @param {*} props.typeName
 * @param {*} props.documentCreator
 * @returns
 */
export function MainDocumentInformation(props) {
  const { isLoading, isError, documentName, typeName, documentCreator } = props;
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <>
      <HeaderTextOutput text="Главная информация" />
      <p>
        {documentName ? (
          <span style={{ display: "block" }}>
            <b>Наименование договора:</b> {documentName}
          </span>
        ) : (
          ""
        )}

        {typeName ? (
          <span style={{ display: "block" }}>
            <b>Тип документа:</b> {typeName}
          </span>
        ) : (
          ""
        )}

        {documentCreator ? (
          <span style={{ display: "block" }}>
            <b>Исполнитель по договору:</b> {documentCreator}
          </span>
        ) : (
          ""
        )}
      </p>
    </>
  );
}
