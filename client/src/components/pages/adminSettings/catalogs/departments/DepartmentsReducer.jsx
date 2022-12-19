import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import DepartmentService from "../../../../../services/AdminServices/DepartmentService"

export const getAllDepartments = createAsyncThunk(
   "DepartmentSlice/getAll",
   async () => {
      try {
         console.log("DepartmentSlice/getAll_Async")
         return await DepartmentService.getAll()
      } catch (error) {
         console.log(error.response?.data.message)
      }
   }
)

//Добавляем новый департамент и ожидаем новый полный список департаментов
export const createDepartment = createAsyncThunk(
   "DepartmentSlice/create",
   async (values) => {
      try {
         console.log("DepartmentSlice/create_Async")
         return await DepartmentService.create(values)
      } catch (error) {
         console.log(error.response?.data.message)
      }
   }
)

export const DepartmentSlice = createSlice({
   name: "departments",
   initialState: {
      departmentsList: [],
      isShowCreateModal: false,
      isShowDeleteModal: false,
      selectedRow: {},
      columns: { data: ["department_id", "department_name"] },
   },
   reducers: {
      openCreateModal(state) {
         state.isShowCreateModal = true
      },
      closeCreateModal(state) {
         state.isShowCreateModal = false
      },
      openDeleteModal(state) {
         state.isShowDeleteModal = true
      },
      closeDeleteModal(state) {
         state.isShowDeleteModal = false
      },
      setSelectedRow(state, action) {
         state.selectedRow = action.payload
      },
   },
   extraReducers: {
      [getAllDepartments.fulfilled]: (state, action) => {
         try {
            console.log("getAllDepartments.fulfilled")
            console.log("Department list", action.payload)
            state.departmentsList = action.payload
         } catch (error) {
            console.log(error)
         }
      },
      [createDepartment.fulfilled]: (state, action) => {
         try {
            console.log("getAllDepartments.fulfilled")
            console.log("New department list", action.payload)
            state.departmentsList = action.payload
         } catch (error) {
            console.log(error)
         }
      },
   },
})

export const {
   openCreateModal,
   closeCreateModal,
   openDeleteModal,
   closeDeleteModal,
} = DepartmentSlice.actions

export default DepartmentSlice.reducer
