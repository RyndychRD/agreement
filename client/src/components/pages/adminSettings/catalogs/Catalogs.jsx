import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Departments from './departments/Departments'
import Users from './users/Users'
import Positions from './positions/Positions'
import { getAllDepartments } from './departments/DepartmentsReducer'

export default function Catalogs() {
	const dispatch = useDispatch()
	dispatch(getAllDepartments())
	return (
		<Routes>
			<Route path="/departments" element={<Departments />} />
			<Route path="/users" element={<Users />} />
			<Route path="/positions" element={<Positions />} />
		</Routes>
	)
}
