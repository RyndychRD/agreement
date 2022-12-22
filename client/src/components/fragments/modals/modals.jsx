/** @format */

import { AModal } from "../../adapter";
import SimpleError from "../spinners/Error";
import SimpleSpinner from "../spinners/Spinner";

export function ModalInput(props) {
  const { children, isLoading, isError } = props;
  return (
    <AModal okText="Сохранить" cancelText="Отмена" destroyOnClose {...props}>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError ? children : ""}
    </AModal>
  );
}
export function ModalUpdate(props) {
  const { children, isLoading, isError } = props;
  return (
    <AModal okText="Редактировать" cancelText="Отмена" {...props}>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError ? children : ""}
    </AModal>
  );
}
export function ModalDelete(props) {
  const { children, isLoading, isError } = props;
  return (
    <AModal okText="Удалить" cancelText="Отмена" {...props}>
      {isLoading ? <SimpleSpinner /> : ""}
      {isError ? <SimpleError /> : ""}
      {!isLoading && !isError ? (
        <>
          Вы уверены что хотите удалить элемент?
          <br /> {children}
        </>
      ) : (
        ""
      )}
    </AModal>
  );
}
