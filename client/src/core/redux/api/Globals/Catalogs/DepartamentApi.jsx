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
          // `isAddRights` Флаг true включает параметризированный запрос
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
        // `isStart` Загружаем данные когда нам они нужны
        if (isStart) {
          try {
            const response = await DepartmentService.getOne({
              // Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
              id: id || currentRow?.department_id,
              // `isAddRights` Флаг true включает параметризованный запрос
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

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;

/**
 * `useGetDepartmentsQueryHook` Хук для запроса всех данных по департаментам
 * @param {boolean} [isAddRights=true]   Флаг true включает параметризированный запрос
 * @example
 * useGetDepartmentsQueryHook(true) // Запрос с параметрами
 * const response = await api.get(`${this.API_ROUTE}?isAddRights=${isAddRights}`);
 *
 * useGetDepartmentsQueryHook() // Запрос без параметров
 * useGetDepartmentsQueryHook(false) // Запрос без параметров
 */
export const useGetDepartmentsQueryHook = useGetDepartmentsQuery;

/**
 * `useGetDepartmentQuery` Хук для запроса данных по департаментам
 * @param {string} [id=""] Id элемента в таблице департамента
 * @param {string} [currentRow = {}] Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
 * @param {boolean} [isStart=true] Загружаем данные когда нам они нужны
 * @param {boolean} [isAddRights=true]   Флаг true включает параметризированный запрос
 * @example 
 * const data = {
				id = "", // Id элемента в таблице департамента
				currentRow = {}, // Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
				isStart = true, // Загружаем данные когда нам они нужны
				isAddRights = false, //Флаг true включает параметризированный запрос
			}
 * useGetDepartmentQueryHook(data)
 */
export const useGetDepartmentQueryHook = useGetDepartmentQuery;

/**
 * `useAddDepartmentMutation` Хук
 */
export const useAddDepartmentMutationHook = useAddDepartmentMutation;

/**
 * `useAddDepartmentMutation` Хук
 */
export const useUpdateDepartmentMutationHook = useUpdateDepartmentMutation;

/**
 * `useDeleteDepartmentMutation` Хук для запроса данных по департаментам
 */
export const useDeleteDepartmentMutationHook = useDeleteDepartmentMutation;
