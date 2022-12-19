/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DepartmentService from '../../../../../services/AdminServices/DepartmentService'

export const getAllDepartments = createAsyncThunk(
	'DepartmentSlice/getAll',
	async () => {
		try {
			// eslint-disable-next-line no-console
			console.log('DepartmentSlice/getAll_Async')
			return await DepartmentService.getAll()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error.response.data.message)
			return error.response?.data?.message
		}
	}
)

export const DepartmentSlice = createSlice({
	name: 'departments',
	initialState: {
		departments_data: [],
		isShowCreateModal: false,
		columns: { data: ['department_id', 'department_name'] },
	},
	reducers: {
		openCloseCreateModal(state) {
			state.isShowCreateModal = !state.isShowCreateModal
		},
	},
	extraReducers: {
		[getAllDepartments.fulfilled]: (state, action) => {
			try {
				// eslint-disable-next-line no-console
				console.log('getAllDepartments.fulfilled')
				// eslint-disable-next-line no-console
				console.log('action', action)
				state.departments_data = action
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error)
			}
		},
	},
})

export const { openCloseCreateModal } = DepartmentSlice.actions

export default DepartmentSlice.reducer
