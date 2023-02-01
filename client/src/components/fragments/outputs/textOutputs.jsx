import SimpleSpinner from "../messages/Spinner";
import SimpleError from "../messages/Error";

export function SimpleTextOutput({
  isLoading,
  isError,
  text = "Текст не передан",
}) {
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return <p>{text}</p>;
}
export function TextOutputWithLabel({
  isLoading,
  isError,
  text = "Текст не передан",
  label = "Название не передано",
  className = {},
  keyIn,
}) {
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <div key={keyIn} className={className}>
      <span>
        {label}:{text}
      </span>
    </div>
  );
}
export function HeaderTextOutput({
  isLoading,
  isError,
  text = "Текст не передан",
}) {
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return <h3>{text}</h3>;
}

export function MainDocumentInformation({
  isLoading,
  isError,
  documentName,
  typeName,
}) {
  if (isLoading) return <SimpleSpinner />;
  if (isError) return <SimpleError />;
  return (
    <>
      <HeaderTextOutput text="Главная информация" />
      <p>
        <b>Наименование документа:</b> {documentName}
        <br />
        <b>Тип документа:</b> {typeName}
      </p>
    </>
  );
}
