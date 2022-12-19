import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../../components/auth/AuthReducer'
import DepartmentsReducer from '../../components/pages/adminSettings/catalogs/departments/DepartmentsReducer'

export const store = configureStore({
	reducer: {
		session: AuthReducer,
		departments: DepartmentsReducer,
	},
})
