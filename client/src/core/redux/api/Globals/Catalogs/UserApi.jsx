import { createApi } from "@reduxjs/toolkit/query/react";
import UserService from "../../../../../services/AdminServices/UserService";

const TAG_TYPE = "Users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getUsers: build.query({
      queryFn: async (props = {}) => {
        try {
          const { isAddForeignTables = false, isAddRights = false } = props;
          const response = await UserService.getAll({
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

    getUser: build.query({
      queryFn: async ({
        id = "",
        currentRow = {},
        isStart = true,
        isAddRights = false,
      }) => {
        if (isStart) {
          try {
            const response = await UserService.getOne({
              id: id || currentRow?.user_id,
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

    addUser: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await UserService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    deleteUser: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await UserService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    updateUser: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            user_id: bodyValues?.user_id || bodyValues?.currentRow?.user_id,
          });
          const response = await UserService.update(bodyPrepared(body));
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
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;

/**
 * `useGetUsersQueryHook` Хук для запроса данных по пользователям(всех)
 * @example
 * useGetUsersQueryHook()
 */
export const useGetUsersQueryHook = useGetUsersQuery;

/**
 *`useGetUserQueryHook` Хук для запроса данных по пользователю(одного)
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
  useGetUserQueryHook(data)
 */
export const useGetUserQueryHook = useGetUserQuery;

/**
 * `useAddUserMutationHook` Добавление нового пользователя
 * @example 
 * data = {
      name: string,
      code_name: string,
    }
    useAddUserMutationHook(data)
 */
export const useAddUserMutationHook = useAddUserMutation;

/**
 * `useUpdateUserMutationHook` хук для обновление пользователя
 */
export const useUpdateUserMutationHook = useUpdateUserMutation;

/**
 * `useDeleteUserMutationHook` хук для удаление пользователя
 */
export const useDeleteUserMutationHook = useDeleteUserMutation;
