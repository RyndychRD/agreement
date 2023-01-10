import { createApi } from "@reduxjs/toolkit/query/react";
import RightService from "../../../../../services/AdminServices/RightService";

const TAG_TYPE = "Rights";

export const rightsApi = createApi({
	reducerPath: "rightsApi",
	tagTypes: [TAG_TYPE],
	endpoints: (build) => ({
		getRights: build.query({
			queryFn: async () => {
				try {
					const response = await RightService.getAll();
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
		getRight: build.query({
			queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
				if (isStart) {
					try {
						const response = await RightService.getOne(
							id || currentRow?.right_id
						);
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
		addRight: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await RightService.create(body);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),
		deleteRight: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await RightService.delete(body);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),
		updateRight: build.mutation({
			queryFn: async (body) => {
				try {
					const bodyPrepared = (bodyValues) => ({
						...bodyValues,
						right_id: bodyValues?.right_id || bodyValues?.currentRow?.right_id,
					});
					const response = await RightService.update(bodyPrepared(body));
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
	useGetRightsQuery,
	useGetRightQuery,
	useAddRightMutation,
	useUpdateRightMutation,
	useDeleteRightMutation,
} = rightsApi;

/**
 * `useGetRightsQueryHook` Хук для запроса данных по правам пользователей(всех)
 * @example 
 * useGetRightsQueryHook()
 */
export const useGetRightsQueryHook = useGetRightsQuery;

/**
 *`useGetRightQueryHook` Хук для запроса данных по правам пользователя(одного)
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
  useGetRightQueryHook(data)
 */
export const useGetRightQueryHook = useGetRightQuery;

/**
 * `useAddRightMutationHook` Добавление новых прав пользователя
 * @example 
 * data = {
      name: string,
      code_name: string,
    }
    useAddRightMutationHook(data)
 */
export const useAddRightMutationHook = useAddRightMutation;

/**
 * `useUpdateRightMutationHook` хук для обновление прав пользователей
 */
export const useUpdateRightMutationHook = useUpdateRightMutation;

/**
 * `useDeleteRightMutationHook` хук для удаление прав пользователей
 */
export const useDeleteRightMutationHook = useDeleteRightMutation;
