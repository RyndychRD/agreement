import { createApi } from "@reduxjs/toolkit/query/react";
import PositionService from "../../../../../services/AdminServices/PositionService";

const TAG_TYPE = "Positions";

export const positionsApi = createApi({
  reducerPath: "positionsApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getPositions: build.query({
      queryFn: async (isAddForeignTables = false) => {
        try {
          const response = await PositionService.getAll(isAddForeignTables);
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
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await PositionService.getOne(
              id || currentRow?.position_id
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

export const {
  useGetPositionsQuery,
  useGetPositionQuery,
  useAddPositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = positionsApi;
