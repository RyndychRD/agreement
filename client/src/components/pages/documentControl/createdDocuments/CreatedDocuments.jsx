/** @format */

import FormBuilder from "../../../formBuilder/FormBuilder";

export default function CreatedDocument(props) {
  const { children } = props;
  return (
    <div>
      {children}
      <FormBuilder />
    </div>
  );
}
