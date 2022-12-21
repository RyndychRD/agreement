import React, { useEffect } from "react"
import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable"

import { useSelector } from "react-redux"
import { Provider } from "../../../../fragments/tables/Provider"
import CreateButtonModel from "./buttonModals/create"
import DeleteButtonAction from "./buttonModals/delete"
import UpdateButtonModel from "./buttonModals/update"

import { useDispatch } from "react-redux"
import { getAllDepartments } from "./DepartmentsReducer"

/** Справочник Департаментов */
export default function Departments() {
   const columns = useSelector((state) => state.departments.columns)
   const data = useSelector((state) => state.departments.departmentsList)
   const dispatch = useDispatch()

   /** Преобразует входящий массив данных из редакса для правильного отображения в таблице */
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
   /**
    * При открытии форму подгружаем новые необходимые данные
    */
   useEffect(() => {
      dispatch(getAllDepartments())
   }, [])

   return (
      <Provider>
         <AdminSettingsTable
            columns={columns}
            dataSource={data ? prepareForTable(data) : null}
            title='Департаменты'
         />
         <CreateButtonModel />
         <UpdateButtonModel />
         <DeleteButtonAction />
      </Provider>
   )
}
