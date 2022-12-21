import React from "react"
import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable"

import CreateButtonModel from "./buttonModals/create"
// import updateButtonAction from "./buttonModals/update"
import { useSelector } from "react-redux"
import DeleteButtonAction from "./buttonModals/delete"
import { Provider } from "../../../../fragments/tables/Provider"

export default function Departments() {
   const columns = useSelector((state) => state.departments.columns)
   const data = useSelector((state) => state.departments.departmentsList)

   function prepareForTable(data) {
      try {
         return data.map((el) => {
            return {
               key: el.id,
               department_id: el.id,
               department_name: el.name,
            }
         })
      } catch (e) {
         console.log("Ошибка пред-обработки данных:", e)
      }
   }

   return (
      <Provider>
         <AdminSettingsTable
            columns={columns}
            dataSource={data ? prepareForTable(data) : null}
            title='Департаменты'
         />
         <CreateButtonModel />
         <DeleteButtonAction />
      </Provider>
   )
}
