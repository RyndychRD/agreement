import React from "react"
import { ATable } from "../../adapter"
import { useCustomDispatch, useCustomState } from "./Provider"
import { getTitle } from "./CommonFunctions"
import "./style.css"

//Для корректной работы предварительно необходимо обернуть в провайдер. Он находится в этой же папке
export default function AdminSettingsTable({
   columns = {},
   title = null,
   dataSource = null,
}) {
   const state = useCustomState()
   const dispatch = useCustomDispatch()
   const buttons = {
      create: () => {
         dispatch({ type: "openCreateModal" })
      },
      update: () => {
         dispatch({ type: "openUpdateModal" })
      },
      delete: () => {
         dispatch({ type: "openDeleteModal" })
      },
   }

   const dictColumn = {
      department_id: { title: "ID", dataIndex: "department_id" },
      department_name: {
         title: "Наименование департамента",
         dataIndex: "department_name",
      },
   }

   const tableColumns = columns?.data.map((column) => {
      return dictColumn[column] ? dictColumn[column] : null
   })

   return (
      <ATable
         key='keyAdminSettingsTable'
         columns={tableColumns}
         dataSource={dataSource}
         pagination={{ position: ["bottomCenter"] }}
         className='height-100'
         title={() => getTitle(title, buttons)}
         onRow={(row) => {
            return {
               onClick: () => {
                  dispatch({
                     type: "selectRow",
                     currentRow: row,
                  })
               },
               onDoubleClick: () => {
                  dispatch({
                     type: "selectRow",
                     currentRow: row,
                  })
                  dispatch({ type: "openUpdateModal" })
               },
            }
         }}
         rowClassName={(row) => {
            if (row.key === state?.currentRow?.key) {
               return "ant-table-row ant-table-row-level-0 selected-table-row"
            }
            return "ant-table-row ant-table-row-level-0"
         }}
      />
   )
}
