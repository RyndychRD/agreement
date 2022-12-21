import React, { useEffect } from "react"
import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable"

import { useSelector } from "react-redux"
import { Provider } from "../../../../fragments/tables/Provider"
import CreateButtonModel from "./buttonModals/create"
import DeleteButtonAction from "./buttonModals/delete"
import UpdateButtonModel from "./buttonModals/update"

import { useDispatch } from "react-redux"
import { getAllDepartments } from "./DepartmentsReducer"
import DepartmentService from "./../../../../../services/AdminServices/DepartmentService"

/** Справочник Департаментов */
export default function Departments() {
   const columns = useSelector((state) => state.departments.columns)
   const data = useSelector((state) => state.departments.departmentsList)
   const dispatch = useDispatch()
   /**
    * При открытии форму подгружаем новые необходимые данные
    */
   useEffect(() => {
      dispatch(getAllDepartments())
   })

   return (
      <Provider>
         <AdminSettingsTable
            columns={columns}
            dataSource={data ? DepartmentService.prepareForTable(data) : null}
            title='Департаменты'
         />
         <CreateButtonModel />
         <UpdateButtonModel />
         <DeleteButtonAction />
      </Provider>
   )
}
