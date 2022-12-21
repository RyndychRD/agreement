/** @format */

import { AModal } from "../../adapter"

export function ModalInput(props, { children }) {
   return (
      <AModal okText='Сохранить' cancelText='Отмена' destroyOnClose {...props}>
         {children}
      </AModal>
   )
}
export function ModalUpdate(props, { children }) {
   return (
      <AModal okText='Редактировать' cancelText='Отмена' {...props}>
         {children}
      </AModal>
   )
}
export function ModalDelete(props, { children }) {
   return (
      <AModal okText='Удалить' cancelText='Отмена' {...props}>
         Вы уверены что хотите удалить элемент?
         <br />
         {children}
      </AModal>
   )
}
