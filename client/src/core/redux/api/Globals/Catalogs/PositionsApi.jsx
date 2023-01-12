import { createApi } from "@reduxjs/toolkit/query/react";
import PositionService from "../../../../../services/AdminServices/PositionService";

const TAG_TYPE = "Positions";

export const positionsApi = createApi({
  reducerPath: "positionsApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getPositions: build.query({
      queryFn: async (props = {}) => {
        try {
          const { isAddForeignTables = false, isAddRights = false } = props;
          const response = await PositionService.getAll({
            isAddForeignTables,
            isAddRights,
          });
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

    getPosition: build.query({
      queryFn: async ({
        id = "",
        currentRow = {},
        isStart = true,
        isAddRights = false,
      }) => {
        if (isStart) {
          try {
            const response = await PositionService.getOne({
              id: id || currentRow?.position_id,
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

    addPosition: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await PositionService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    deletePosition: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await PositionService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    updatePosition: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            position_id:
              bodyValues?.position_id || bodyValues?.currentRow?.position_id,
          });
          const response = await PositionService.update(bodyPrepared(body));
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
  useGetPositionsQuery,
  useGetPositionQuery,
  useAddPositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = positionsApi;

/**
 * `useGetPositionsQueryHook` Хук для запроса всех данных по должностям
 * @param {boolean} [isAddRights=true]   Флаг true включает параметризированный запрос
 * @example
 * useGetPositionsQueryHook(true) // Запрос с параметрами
 * const response = await api.get(`${this.API_ROUTE}?isAddRights=${isAddRights}`);
 *
 * useGetPositionsQueryHook() // Запрос без параметров
 * useGetPositionsQueryHook(false) // Запрос без параметров
 */
export const useGetPositionsQueryHook = useGetPositionsQuery;

/**
 * `useGetPositionQueryHook` Хук для запроса данных по должностям
 * @param {string} [id=""] Id элемента в таблице должностям
 * @param {string} [currentRow = {}] Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
 * @param {boolean} [isStart=true] Загружаем данные когда нам они нужны
 * @param {boolean} [isAddRights=true]   Флаг true включает параметризированный запрос
 * @example 
 * const data = {
				id = "", // Id элемента в таблице должностям
				currentRow = {}, // Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
				isStart = true, // Загружаем данные когда нам они нужны
				isAddRights = false, //Флаг true включает параметризированный запрос
			}
 * useGetPositionQueryHook(data)
 */
export const useGetPositionQueryHook = useGetPositionQuery;

/**
 * `useAddPositionMutationHook` Хук для добавление новых должностей
 */
export const useAddPositionMutationHook = useAddPositionMutation;

/**
 * `useUpdatePositionMutationHook` Хук для обновление должностей
 */
export const useUpdatePositionMutationHook = useUpdatePositionMutation;

/**
 * `useDeletePositionMutation` Хук для запроса данных по должностям
 */
export const useDeletePositionMutationHook = useDeletePositionMutation;
