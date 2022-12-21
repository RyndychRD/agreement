import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import DepartmentService from "../../../../../services/AdminServices/DepartmentService"

/** Возвращает список департаментов из БД */
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

/**Добавляем новый департамент и ожидаем новый полный список департаментов*/
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
/**Изменяем существующий департамент и ожидаем новый полный список департаментов*/
export const updateDepartment = createAsyncThunk(
   "DepartmentSlice/create",
   async (values) => {
      try {
         console.log("DepartmentSlice/update_Async")
         return await DepartmentService.update(values)
      } catch (error) {
         console.log(error.response?.data.message)
      }
   }
)
/**Удаляем департамент и ожидаем новый полный список департаментов*/
export const deleteDepartment = createAsyncThunk(
   "DepartmentSlice/delete",
   async (values) => {
      try {
         console.log("DepartmentSlice/delete_Async")
         return await DepartmentService.delete(values)
      } catch (error) {
         console.log(error.response?.data.message)
      }
   }
)

export const DepartmentSlice = createSlice({
   name: "departments",
   initialState: {
      /** Список всех департаментов */
      departmentsList: [],
      /** Список всех колонок для отображения в таблице */
      columns: { data: ["department_id", "department_name"] },
   },
   reducers: {},
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
            console.log("createDepartments.fulfilled")
            console.log("New department list", action.payload)
            state.departmentsList = action.payload
         } catch (error) {
            console.log(error)
         }
      },
      [updateDepartment.fulfilled]: (state, action) => {
         try {
            console.log("updateDepartments.fulfilled")
            console.log("New department list", action.payload)
            state.departmentsList = action.payload
         } catch (error) {
            console.log(error)
         }
      },
      [deleteDepartment.fulfilled]: (state, action) => {
         try {
            console.log("deleteDepartments.fulfilled")
            console.log("New department list", action.payload)
            state.departmentsList = action.payload
         } catch (error) {
            console.log(error)
         }
      },
   },
})

export default DepartmentSlice.reducer
