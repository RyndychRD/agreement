/* eslint-disable react/react-in-jsx-scope */
import { ModalDelete } from "../../../../../fragments/modals/modals"
import { useDispatch } from "react-redux"
import { deleteDepartment } from "./../DepartmentsReducer"
import { ASpan } from "../../../../../adapter"

export default function DeleteButtonAction({ state, dispatch }) {
   const dispatchRedux = useDispatch()
   return (
      <ModalDelete
         open={state.isShowDeleteModal}
         onOk={() => {
            console.log("Удалить элемент", state.currentRow)
            dispatchRedux(deleteDepartment(state.currentRow))
            dispatch({ type: "closeDeleteModal" })
         }}
         onCancel={() => {
            dispatch({ type: "closeDeleteModal" })
         }}
      >
         <ASpan>{state.currentRow?.department_name}</ASpan>
      </ModalDelete>
   )
}
