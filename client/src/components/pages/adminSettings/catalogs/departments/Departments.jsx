import AdminSettingsTable from "../../../../fragments/tables/AdminSettingsTable"
import { SimpleSpinner } from "../../../../fragments/spinners/Spinner"
import React from "react"

import CreateButtonModel from "./buttonModals/create"
import updateButtonAction from "./buttonModals/update"
import DeleteButtonAction from "./buttonModals/delete"

import { useDispatch, useSelector } from "react-redux"
import { openCreateModal, openDeleteModal } from "./DepartmentsReducer"

export default function Departments() {
   const columns = useSelector((state) => state.departments.columns)
   const dispatch = useDispatch()

   const ContextTable = React.createContext()

   const buttons = {
      create: () => {
         dispatch(openCreateModal())
      },
      update: updateButtonAction,
      delete: () => {
         dispatch(openDeleteModal())
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
   function countReducer(state, action) {
      switch (action.type) {
         case "selectRow": {
            console.log("countReducer(state, action)-selectRow", state, action)
            return { currentRow: action.currentRow }
         }
         default: {
            throw new Error(`Unhandled action type: ${action.type}`)
         }
      }
   }

   const [stateTable, dispatchTable] = React.useReducer(countReducer, {
      currentRow: null,
   })

   return !data ? (
      <SimpleSpinner />
   ) : (
      <ContextTable.Provider value={stateTable}>
         <AdminSettingsTable
            buttons={buttons}
            colums={columns}
            dataSource={data ? prepareForTable(data) : null}
            title='Департаменты'
            tableDispatcher={dispatchTable}
         />
         <CreateButtonModel />
         <DeleteButtonAction stateTable={stateTable} />
      </ContextTable.Provider>
   )
}
