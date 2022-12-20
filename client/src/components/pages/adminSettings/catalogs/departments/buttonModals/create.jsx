import { Form } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import { AForm } from "../../../../../adapter"
import { TextInput_FormItem as TextInputFormItem } from "../../../../../fragments/inputs/textInputs"
import { ModalInput } from "../../../../../fragments/modals/modals"
import { createDepartment } from "../DepartmentsReducer"
import { useCustomDispatch} from "./../Provider"

export default function CreateButtonModel() {
   const dispatchRedux = useDispatch()
   const dispatch = useCustomDispatch()
   const onFinish = () => {
      form
         .validateFields()
         .then((values) => {
            dispatchRedux(createDepartment(values))
            dispatch({ type: "closeCreateModal" })
         })
         .catch((info) => {
            console.log(
               "Ошибка валидации на форме создания департамента:",
               info
            )
         })
   }

   //Специально такой вызов, по другому сделаю позже. Служит для отслеживания формы из модального окна для обработки по кнопке
   const [form] = Form.useForm()

   return (
      <ModalInput
         // open={state.isShowCreateModal}
         onOk={onFinish}
         onCancel={() => {
            form.resetFields()
            dispatch({ type: "closeCreateModal" })
         }}
      >
         <AForm form={form}>
            <TextInputFormItem
               title="Наименование департамента"
               name="newDepartmentName"
               rules={[
                  {
                     required: true,
                     message: "Введите название департамента",
                  },
               ]}
            />
         </AForm>
      </ModalInput>
   )
}
