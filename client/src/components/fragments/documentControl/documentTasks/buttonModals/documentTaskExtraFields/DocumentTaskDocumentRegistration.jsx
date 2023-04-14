import DocumentRegistrationFields from "../../../documentRegistration/DocumentRegistrationFields";

export default function DocumentTaskDocumentRegistration(props) {
  const { isDisabled, form } = props;
  return <DocumentRegistrationFields form={form} isDisabled={isDisabled} />;
}
