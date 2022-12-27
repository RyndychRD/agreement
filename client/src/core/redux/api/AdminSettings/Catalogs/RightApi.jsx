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

export const {
  useGetRightsQuery,
  useGetRightQuery,
  useAddRightMutation,
  useUpdateRightMutation,
  useDeleteRightMutation,
} = rightsApi;
