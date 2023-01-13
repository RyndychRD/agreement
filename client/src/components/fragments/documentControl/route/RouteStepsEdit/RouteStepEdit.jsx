export default function RouteStepEdit({ step }) {
  const {
    step: stepNumber,
    actual_signer_id,
    deputy_signer_id,
    document_signature_type_id,
    sign_date,
    signer_id,
  } = step;
  return <span>{stepNumber} </span>;
}
