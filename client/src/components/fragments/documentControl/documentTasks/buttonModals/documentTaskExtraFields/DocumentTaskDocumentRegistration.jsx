import DocumentRegistrationFields from "../../../documentRegistration/DocumentRegistrationFields";

/**
 * Поля для заполнения/отображения для поручений на регистрацию документов. Тип 3
 * @param {*} props.form
 * @param {*} props.isDisabled
 * @returns
 */
export default function DocumentTaskDocumentRegistration(props) {
  const { isDisabled, form } = props;
  return <DocumentRegistrationFields form={form} isDisabled={isDisabled} />;
}
