/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PositionService from "../../../../../services/AdminServices/PositionService";

/** Возвращает список должностей из БД */
export const getAllPositions = createAsyncThunk(
  "PositionsSlice/getAll",
  async () => {
    try {
      console.log("PositionsSlice/getAll_Async");
      return await PositionService.getAll();
    } catch (error) {
      console.log(error.response?.data.message);
      return error;
    }
  }
);

// /**Добавляем новый департамент и ожидаем новый полный список департаментов*/
// export const createDepartment = createAsyncThunk(
//    "DepartmentSlice/create",
//    async (values) => {
//       try {
//          console.log("DepartmentSlice/create_Async")
//          return await DepartmentService.create(values)
//       } catch (error) {
//          console.log(error.response?.data.message)
//       }
//    }
// )
// /**Изменяем существующий департамент и ожидаем новый полный список департаментов*/
// export const updateDepartment = createAsyncThunk(
//    "DepartmentSlice/create",
//    async (values) => {
//       try {
//          console.log("DepartmentSlice/update_Async")
//          return await DepartmentService.update(values)
//       } catch (error) {
//          console.log(error.response?.data.message)
//       }
//    }
// )
// /**Удаляем департамент и ожидаем новый полный список департаментов*/
// export const deleteDepartment = createAsyncThunk(
//    "DepartmentSlice/delete",
//    async (values) => {
//       try {
//          console.log("DepartmentSlice/delete_Async")
//          return await DepartmentService.delete(values)
//       } catch (error) {
//          console.log(error.response?.data.message)
//       }
//    }
// )

export const PositionsSlice = createSlice({
  name: "positions",
  initialState: {
    /** Список всех департаментов */
    positionsList: [],
    /** Список всех колонок для отображения в таблице */
    columns: { data: ["position_id", "position_name", "department_name"] },
  },
  reducers: {},
  extraReducers: {
    [getAllPositions.fulfilled]: (state, action) => {
      try {
        console.log("getAllPositions.fulfilled");
        console.log("Positions list", action.payload);
        state.positionsList = action.payload;
      } catch (error) {
        console.log(error);
      }
    },
    // [createDepartment.fulfilled]: (state, action) => {
    //    try {
    //       console.log("createDepartments.fulfilled")
    //       console.log("New department list", action.payload)
    //       state.departmentsList = action.payload
    //    } catch (error) {
    //       console.log(error)
    //    }
    // },
    // [deleteDepartment.fulfilled]: (state, action) => {
    //    try {
    //       console.log("deleteDepartments.fulfilled")
    //       console.log("New department list", action.payload)
    //       state.departmentsList = action.payload
    //    } catch (error) {
    //       console.log(error)
    //    }
    // },
  },
});

export default PositionsSlice.reducer;
