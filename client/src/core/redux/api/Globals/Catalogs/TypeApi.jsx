import { createApi } from "@reduxjs/toolkit/query/react";
import TypeService from "../../../../../services/AdminServices/TypeService";

const TAG_TYPE = "Types";

export const typesApi = createApi({
  reducerPath: "typesApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getTypes: build.query({
      queryFn: async (props) => {
        const isShowOnlyForCreation = props?.isShowOnlyForCreation
          ? props.isShowOnlyForCreation
          : false;
        try {
          const response = await TypeService.getAll(isShowOnlyForCreation);
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
    getType: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await TypeService.getOne(
              id || currentRow?.type_id
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
    addType: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await TypeService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    deleteType: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await TypeService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    updateType: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            type_id: bodyValues?.type_id || bodyValues?.currentRow?.type_id,
          });
          const response = await TypeService.update(bodyPrepared(body));
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
  useGetTypesQuery,
  useGetTypeQuery,
  useAddTypeMutation,
  useUpdateTypeMutation,
  useDeleteTypeMutation,
} = typesApi;

/**
 * `useGetDepartmentsQueryHook` Хук для запроса всех данных по типам документа
 */
export const useGetTypesQueryHook = useGetTypesQuery;

/**
 * `useGetDepartmentQuery` Хук для запроса данных по типу документа
 * @param {string} [id=""] Id элемента в таблице типов документов
 * @param {string} [currentRow = {}] Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
 * @param {boolean} [isStart=true] Загружаем данные когда нам они нужны
 * useGetDepartmentQueryHook(data)
 */
export const useGetTypeQueryHook = useGetTypeQuery;

/**
 * `useAddDepartmentMutation` Хук
 */
export const useAddTypeMutationHook = useAddTypeMutation;

/**
 * `useAddDepartmentMutation` Хук
 */
export const useUpdateTypeMutationHook = useUpdateTypeMutation;

/**
 * `useDeleteDepartmentMutation` Хук для удаления типа документа
 */
export const useDeleteTypeMutationHook = useDeleteTypeMutation;
