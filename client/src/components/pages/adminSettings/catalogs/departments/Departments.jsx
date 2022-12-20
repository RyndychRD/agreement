import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable"
import React from "react"

import CreateButtonModel from "./buttonModals/create"
import updateButtonAction from "./buttonModals/update"
import DeleteButtonAction from "./buttonModals/delete"

import { useSelector } from "react-redux"

export default function Departments() {
   const columns = useSelector((state) => state.departments.columns)

   const DepartmentContext = React.createContext()
   function departmentReducer(state, action) {
      switch (action.type) {
         case "selectRow": {
            return { ...state, currentRow: action.currentRow }
         }
         case "openCreateModal": {
            return { ...state, isShowCreateModal: true }
         }
         case "closeCreateModal": {
            return { ...state, isShowCreateModal: false }
         }
         case "openDeleteModal": {
            return { ...state, isShowDeleteModal: true }
         }
         case "closeDeleteModal": {
            return { ...state, isShowDeleteModal: false }
         }
         default: {
            throw new Error(`Unhandled action type: ${action.type}`)
         }
      }
   }
   const [departmentState, departmentDispatch] = React.useReducer(
      departmentReducer,
      {
         currentRow: null,
         isShowCreateModal: false,
         isShowDeleteModal: false,
      }
   )

   const onRowClick = (row) => {
      console.log("custom click on row", row)
      departmentDispatch({
         type: "selectRow",
         currentRow: row,
      })
   }
   const onRowDoubleClick = (row) => {
      console.log("custom double click on row", row)
   }

   const buttons = {
      create: () => {
         departmentDispatch({ type: "openCreateModal" })
      },
      update: updateButtonAction,
      delete: () => {
         departmentDispatch({ type: "openDeleteModal" })
      },
   }

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
         console.log("Ошибка предобработки данных:", e)
      }
   }

   return (
      <DepartmentContext.Provider value={departmentState}>
         <AdminSettingsTable
            buttons={buttons}
            colums={columns}
            dataSource={data ? prepareForTable(data) : null}
            title='Департаменты'
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
         />
         <CreateButtonModel
            state={departmentState}
            dispatch={departmentDispatch}
         />
         <DeleteButtonAction
            state={departmentState}
            dispatch={departmentDispatch}
         />
      </DepartmentContext.Provider>
   )
}
