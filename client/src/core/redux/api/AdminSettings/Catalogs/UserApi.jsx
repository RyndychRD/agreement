import { createApi } from "@reduxjs/toolkit/query/react";
import UserAdminService from "../../../../../services/AdminServices/UserService";

const TAG_TYPE = "Users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getUsers: build.query({
      queryFn: async (isAddForeignTables = false) => {
        try {
          const response = await UserAdminService.getAll(isAddForeignTables);
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
      queryFn: async ({ id = "", isStart = true }) => {
        if (isStart) {
          try {
            const response = await UserAdminService.getOne(id);
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
          const response = await UserAdminService.create(body);
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
          const response = await UserAdminService.delete(body);
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
          const response = await UserAdminService.update(body);
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
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
