import { createApi } from "@reduxjs/toolkit/query/react";
import ArchiveTypeService from "../../../../../services/AdminServices/ArchiveTypeService";

const TAG_TYPE = "ArchiveTypes";

export const archiveTypesApi = createApi({
  reducerPath: "archiveTypesApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getArchiveTypes: build.query({
      queryFn: async () => {
        try {
          const response = await ArchiveTypeService.getAll();
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

    getArchiveType: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        // `isStart` Загружаем данные когда нам они нужны
        if (isStart) {
          try {
            const response = await ArchiveTypeService.getOne({
              // Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
              id: id || currentRow?.archive_type_id,
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

    addArchiveType: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await ArchiveTypeService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    deleteArchiveType: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await ArchiveTypeService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    updateArchiveType: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            archive_type_id:
              bodyValues?.archive_type_id ||
              bodyValues?.currentRow?.archive_type_id,
          });
          const response = await ArchiveTypeService.update(bodyPrepared(body));
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
  useGetArchiveTypesQuery,
  useGetArchiveTypeQuery,
  useAddArchiveTypeMutation,
  useUpdateArchiveTypeMutation,
  useDeleteArchiveTypeMutation,
} = archiveTypesApi;

/**
 * `useGetArchiveTypesQueryHook` Хук для запроса всех данных по департаментам
 * @param {boolean} [isAddRights=true]   Флаг true включает параметризированный запрос
 * @example
 * useGetArchiveTypesQueryHook(true) // Запрос с параметрами
 * const response = await api.get(`${this.API_ROUTE}?isAddRights=${isAddRights}`);
 *
 * useGetArchiveTypesQueryHook() // Запрос без параметров
 * useGetArchiveTypesQueryHook(false) // Запрос без параметров
 */
export const useGetArchiveTypesQueryHook = useGetArchiveTypesQuery;

/**
 * `useGetArchiveTypeQuery` Хук для запроса данных по департаментам
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
 * useGetArchiveTypeQueryHook(data)
 */
export const useGetArchiveTypeQueryHook = useGetArchiveTypeQuery;

/**
 * `useAddArchiveTypeMutation` Хук
 */
export const useAddArchiveTypeMutationHook = useAddArchiveTypeMutation;

/**
 * `useAddArchiveTypeMutation` Хук
 */
export const useUpdateArchiveTypeMutationHook = useUpdateArchiveTypeMutation;

/**
 * `useDeleteArchiveTypeMutation` Хук для запроса данных по департаментам
 */
export const useDeleteArchiveTypeMutationHook = useDeleteArchiveTypeMutation;
