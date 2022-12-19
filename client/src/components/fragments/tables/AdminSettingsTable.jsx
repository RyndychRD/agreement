import { ATable } from "../../adapter"
import { getColumn, getTitle } from "./CommonFunctions"
import React, { useState } from "react"
import "./style.css"

const buttonDefault = {
   create: () => {
      console.log("Create button pushed, no action provided")
   },
   update: () => {
      console.log("Update button pushed, no action provided")
   },
   delete: () => {
      console.log("Delete button pushed, no action provided")
   },
}

export default function AdminSettingsTable({
   tableDispatcher,
   colums = {},
   title = null,
   buttons = buttonDefault,
   dataSource = null,
   onRowClickEvent = (row) => {
      console.log("one click on row ", row)
   },
   onRowDoubleClickEvent = (row) => {
      console.log("double click on row ", row)
   },
}) {
   const dictColumn = {
      department_id: getColumn("ID", "department_id"),
      department_name: getColumn(
         "Наименование департамента",
         "department_name"
      ),
   }

   const [selectedRow, setSelectedRow] = useState({})

   const tableColumns = colums?.data.map((column) => {
      return dictColumn[column] ? dictColumn[column] : null
   })

   console.log("redraw")

   return (
      <>
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
                     tableDispatcher({ type: "selectRow", currentRow: row })
                     onRowClickEvent(row)
                     setSelectedRow(row)
                  },
                  onDoubleClick: () => {
                     onRowDoubleClickEvent(row)
                  },
               }
            }}
            rowClassName={(row) => {
               if (row === selectedRow) {
                  return "ant-table-row ant-table-row-level-0 selected-table-row"
               }
               return "ant-table-row ant-table-row-level-0"
            }}
         />
      </>
   )
}
