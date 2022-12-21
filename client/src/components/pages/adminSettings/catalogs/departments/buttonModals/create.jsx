import { useDispatch } from "react-redux"
import { AForm, AUseForm } from "../../../../../adapter"
import TextInputFormItem from "../../../../../fragments/inputs/textInputs"
import { ModalInput } from "../../../../../fragments/modals/modals"
import { createDepartment } from "../DepartmentsReducer"
import {
   useCustomDispatch,
   useCustomState,
} from "../../../../../fragments/tables/Provider"

/**
 * @return Модальное окно для создания нового департамента
 */
export default function CreateButtonModel() {
   const dispatchRedux = useDispatch()
   const state = useCustomState()
   const dispatch = useCustomDispatch()
   /** Служит для отслеживания формы из модального окна для обработки по кнопке */
   const [form] = AUseForm()

   /**
    * При создании валидируем форму и отправляем все данные в сервис
    */
   const onFinish = () => {
      form
         .validateFields()
         .then((values) => {
            dispatchRedux(createDepartment(values))
            dispatch({ type: "closeAllModal" })
         })
         .catch((info) => {
            console.log(
               "Ошибка валидации на форме создания департамента:",
               info
            )
         })
   }

   return (
      <ModalInput
         open={state.isShowCreateModal}
         onOk={onFinish}
         onCancel={() => {
            form.resetFields()
            dispatch({ type: "closeAllModal" })
         }}
      >
         {state.isShowCreateModal ? (
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
      </ModalInput>
   )
}
