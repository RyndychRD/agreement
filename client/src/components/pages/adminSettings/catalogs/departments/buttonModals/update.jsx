import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AForm, AUseForm } from "../../../../../adapter"
import TextInputFormItem from "../../../../../fragments/inputs/textInputs"
import { ModalUpdate } from "../../../../../fragments/modals/modals"
import { updateDepartment } from "../DepartmentsReducer"
import {
   useCustomDispatch,
   useCustomState,
} from "../../../../../fragments/tables/Provider"

export default function UpdateButtonModel() {
   const dispatchRedux = useDispatch()
   const state = useCustomState()
   const dispatch = useCustomDispatch()
   // Служит для отслеживания формы из модального окна для обработки по кнопке
   const [form] = AUseForm()

   const departmentsList = useSelector(
      (stateRedux) => stateRedux.departments.departmentsList
   )

   /**
    * При редактировании валидируем форму и отправляем все данные в сервис
    */
   const onFinish = () => {
      form
         .validateFields()
         .then((values) => {
            values = { ...values, id: state.currentRow?.department_id }
            dispatchRedux(updateDepartment(values))
            dispatch({ type: "closeAllModal" })
         })
         .catch((info) => {
            console.log(
               "Ошибка валидации на форме создания департамента:",
               info
            )
         })
   }

   /**
    * Очищаем форму, достаем нужную строку из хранилища редакса по переданному ID
    * Заполняем форму полученными данными
    */
   useEffect(() => {
      form.resetFields()
      form.setFieldsValue({
         newDepartmentName: departmentsList?.find(
            (object) => object.id === state.currentRow?.department_id
         )?.name,
      })
   }, [departmentsList, form, state.currentRow?.department_id])

   return (
      <ModalUpdate
         open={state.isShowUpdateModal && state.currentRow}
         onOk={onFinish}
         onCancel={() => {
            dispatch({ type: "closeAllModal" })
         }}
      >
         {state.isShowUpdateModal ? (
            <AForm form={form}>
               <TextInputFormItem
                  title='Наименование департамента'
                  name='newDepartmentName'
                  rules={[
                     {
                        required: true,
                        message: "Введите название департамента",
                     },
                  ]}
               />
            </AForm>
         ) : (
            ""
         )}
      </ModalUpdate>
   )
}
