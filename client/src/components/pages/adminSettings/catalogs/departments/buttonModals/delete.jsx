/* eslint-disable react/react-in-jsx-scope */
import { ModalDelete } from "../../../../../fragments/modals/modals"
import { useSelector } from "react-redux"
import { closeDeleteModal } from "../DepartmentsReducer"
import { useDispatch } from "react-redux"

export default function DeleteButtonAction({ stateTable }) {
   const dispatch = useDispatch()
   const isOpen = useSelector((state) => state.departments.isShowDeleteModal)
   return (
      <ModalDelete
         open={isOpen}
         onOk={() => {
            console.log("Удалить элемент", stateTable)
         }}
         onCancel={() => {
            dispatch(closeDeleteModal())
         }}
      ></ModalDelete>
   )
}
