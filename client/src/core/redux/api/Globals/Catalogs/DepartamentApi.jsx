import { createApi } from "@reduxjs/toolkit/query/react";
import DepartmentService from "../../../../../services/AdminServices/DepartmentService";

const TAG_TYPE = "Departments";

export const departmentsApi = createApi({
	reducerPath: "departmentsApi",
	tagTypes: [TAG_TYPE],
	endpoints: (build) => ({
		getDepartments: build.query({
			queryFn: async (isAddRights = false) => {
				try {
					const response = await DepartmentService.getAll({ isAddRights });
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: TAG_TYPE, id })),
							{ type: TAG_TYPE, id: "LIST" },
					  ]
					: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		getDepartment: build.query({
			queryFn: async ({
				id = "",
				currentRow = {},
				isStart = true,
				isAddRights = false,
			}) => {
				if (isStart) {
					try {
						const response = await DepartmentService.getOne({
							id: id || currentRow?.department_id,
							isAddRights,
						});
						return { data: response };
					} catch (e) {
						return { error: e.message };
					}
				}
				return {};
			},
			providesTags: (result) =>
				result
					? [
							{ ...result, type: TAG_TYPE, id: result?.id },
							{ type: TAG_TYPE, id: "LIST" },
					  ]
					: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		addDepartment: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await DepartmentService.create(body);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		deleteDepartment: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await DepartmentService.delete(body);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		updateDepartment: build.mutation({
			queryFn: async (body) => {
				try {
					const bodyPrepared = (bodyValues) => ({
						...bodyValues,
						department_id:
							bodyValues?.department_id ||
							bodyValues?.currentRow?.department_id,
					});
					const response = await DepartmentService.update(bodyPrepared(body));
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),
	}),
});

const {
	_useGetDepartmentsQuery,
	_useGetDepartmentQuery,
	_useAddDepartmentMutation,
	_useUpdateDepartmentMutation,
	_useDeleteDepartmentMutation,
} = departmentsApi;

/**
 * `useGetDepartmentsQuery` Хук для запроса всех данных по департаментам
 * @param isAddRights `boolean` Флаг true включает параметризованы запрос
 * @example
 * useGetDepartmentsQuery(true) // Запрос с параметрами
 * const response = await api.get(`${this.API_ROUTE}?isAddRights=${isAddRights}`);
 *
 * useGetDepartmentsQuery() // Запрос без параметров
 * useGetDepartmentsQuery(false) // Запрос без параметров
 */
export const useGetDepartmentsQuery = _useGetDepartmentsQuery;

/**
 * `useGetDepartmentsQuery` Хук для запроса всех данных по департаментам
 * @param isAddRights `boolean` Флаг true включает параметризованы запрос
 * @example
 * useGetDepartmentsQuery(true) // Запрос с параметрами
 * const response = await api.get(`${this.API_ROUTE}?isAddRights=${isAddRights}`);
 *
 * useGetDepartmentsQuery() // Запрос без параметров
 * useGetDepartmentsQuery(false) // Запрос без параметров
 */
export const useGetDepartmentQuery = _useGetDepartmentQuery;
