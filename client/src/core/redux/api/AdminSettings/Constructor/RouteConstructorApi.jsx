import { createApi } from "@reduxjs/toolkit/query/react";
import RouteService from "../../../../../services/AdminServices/constructor/RouteService";

const TAG_TYPE = "Routes";

export const routesApi = createApi({
  reducerPath: "routesApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getRoutes: build.query({
      queryFn: async () => {
        try {
          const response = await RouteService.getAll();
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
    getRoute: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await RouteService.getOne(id || currentRow?.key);
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
    addRoute: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await RouteService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    deleteRoute: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await RouteService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    updateRoute: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            route_id: bodyValues?.key || bodyValues?.currentRow?.key,
          });
          const response = await RouteService.update(bodyPrepared(body));
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
  useGetRoutesQuery,
  useGetRouteQuery,
  useAddRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = routesApi;

/**
 * `useGetRoutesQueryHook` Хук для запроса всех данных по маршрутам
 */
export const useGetRoutesQueryHook = useGetRoutesQuery;

/**
 * `useGetRouteQuery` Хук для запроса данных по маршруту
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
 * useGetRouteQueryHook(data)
 */
export const useGetRouteQueryHook = useGetRouteQuery;

/**
 * `useAddRouteMutationHook` Хук
 */
export const useAddRouteMutationHook = useAddRouteMutation;

/**
 * `useUpdateRouteMutationHook` Хук
 */
export const useUpdateRouteMutationHook = useUpdateRouteMutation;

/**
 * `useDeleteRouteMutationHook` Хук для удаления маршрута
 */
export const useDeleteRouteMutationHook = useDeleteRouteMutation;
