/* eslint-disable react/react-in-jsx-scope */
import { ModalDelete } from "../../../../../fragments/modals/modals"
import { useDispatch } from "react-redux"
import { deleteDepartment } from "./../DepartmentsReducer"
import { ASpan } from "../../../../../adapter"
import {
   useCustomDispatch,
   useCustomState,
} from "../../../../../fragments/tables/Provider"

export default function DeleteButtonAction() {
   const dispatchRedux = useDispatch()
   const state = useCustomState()
   const dispatch = useCustomDispatch()

   /**
    * При удалении отправляем текущий выбранный элемент в сервис
    */
   const onFinish = () => {
      console.log("Удалить элемент", state.currentRow)
      dispatchRedux(deleteDepartment(state.currentRow))
      dispatch({ type: "closeAllModal" })
   }

   return (
      <ModalDelete
         open={state.isShowDeleteModal && state.currentRow}
         onOk={onFinish}
         onCancel={() => {
            dispatch({ type: "closeAllModal" })
         }}
      >
         {state.isShowDeleteModal ? (
            <ASpan style={{ fontWeight: "bold", marginTop: "5px" }}>
               {state.currentRow?.department_name}
            </ASpan>
         ) : (
            ""
         )}
      </ModalDelete>
   )
}
