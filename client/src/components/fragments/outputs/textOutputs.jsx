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
      <p>
        Наименование документа: <b>{documentName}</b>
      </p>
      <p>
        Тип документа: <b>{typeName}</b>
      </p>
    </>
  );
}