import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DepartmentService from "../../../../../services/AdminServices/DepartmentService";

export const getAllDepartments = createAsyncThunk(
	"DepartmentSlice/getAll",
	async () => {
		try {
			console.log("DepartmentSlice/getAll_Async");
			return await DepartmentService.getAll();
		} catch (error) {
			console.log(error.response.data.message);
		}
	}
);

export const DepartmentSlice = createSlice({
	name: "departments",
	initialState: {
		departments_data: [],
		isShowCreateModal: false,
		columns: { data: ["department_id", "department_name"] },
	},
	reducers: {
		openCloseCreateModal(state) {
			state.isShowCreateModal = !state.isShowCreateModal;
		},
	},
	extraReducers: {
		[getAllDepartments.fulfilled]: (state, action) => {
			try {
				console.log("getAllDepartments.fulfilled");
				console.log("action", action);
				state.departments_data = action;
			} catch (error) {
				console.log(error);
			}
		},
	},
});

export const { openCloseCreateModal } = DepartmentSlice.actions;

export default DepartmentSlice.reducer;
