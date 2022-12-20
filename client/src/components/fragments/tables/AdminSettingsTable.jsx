import { ATable } from "../../adapter"
import { getColumn, getTitle } from "./CommonFunctions"
import React, { useState } from "react"
import "./style.css"
import { useRef } from "react"

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
const onRowClickDefault = (row) => {
   console.log("default one click on row ", row)
}
const onRowDoubleClickDefault = (row) => {
   console.log("default double click on row ", row)
}

export default function AdminSettingsTable({
   colums = {},
   title = null,
   buttons = buttonDefault,
   dataSource = null,
   onRowClick = onRowClickDefault,
   onRowDoubleClick = onRowDoubleClickDefault,
}) {
   const dictColumn = {
      department_id: getColumn("ID", "department_id"),
      department_name: getColumn(
         "Наименование департамента",
         "department_name"
      ),
   }

   const tableColumns = colums?.data.map((column) => {
      return dictColumn[column] ? dictColumn[column] : null
   })

   const selectedRow = useRef()
   // const classRow = useRef("ant-table-row ant-table-row-level-0")

   // useEffect(() => {
   //    (row) => {
   //       // if (row.key === selectedRow?.key) {
   //       console.log(selectedRow)
   //       if (row.key === selectedRow.current?.key) {
   //          console.log("Изменен класс")
   //          return "ant-table-row ant-table-row-level-0 selected-table-row"
   //       }
   //       console.log("Изменен очищен")
   //       return "ant-table-row ant-table-row-level-0"
   //    }
   // }, [selectedRow.current?.key])

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
                  // setSelectedRow(row)
                  selectedRow.current = row
                  onRowClick(row)
                  console.log("here", selectedRow.current)
                  console.log("here row", row)
               },
               onDoubleClick: (event) => {
                  // setSelectedRow(row)
                  console.log(event)
                  selectedRow.current = row
                  onRowDoubleClick(row)
               },
            }
         }}
         rowClassName={(row) => {
            // if (row.key === selectedRow?.key) {
            console.log("console.log(selectedRow)", selectedRow)
            if (row.key === selectedRow.current?.key) {
               console.log("Изменен класс")
               return "ant-table-row ant-table-row-level-0 selected-table-row"
            }
            return "ant-table-row ant-table-row-level-0"
         }}
      />
   )
}
