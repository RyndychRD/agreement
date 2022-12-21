import { AInput, AFormItem } from "../../adapter"
import React from "react"

export function TextInputFormItem({
   title = "Поле ввода",
   name = "formItemName",
   rules = {},
   value = "",
}) {
   return (
      <AFormItem
         label={title}
         name={name}
         rules={rules}
         labelCol={{ span: 24 }}
      >
         <AInput placeholder={title} value={value}></AInput>
      </AFormItem>
   )
}
