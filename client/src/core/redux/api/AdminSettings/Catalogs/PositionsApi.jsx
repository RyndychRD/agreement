import { createApi } from "@reduxjs/toolkit/query/react";
import PositionService from "../../../../../services/AdminServices/PositionService";

export const positionsApi = createApi({
  reducerPath: "positionsApi",
  tagTypes: ["Positions"],
  endpoints: (build) => ({
    getPositions: build.query({
      queryFn: async () => {
        try {
          const response = await PositionService.getAll();
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Positions", id })),
              { type: "Positions", id: "LIST" },
            ]
          : [{ type: "Positions", id: "LIST" }],
    }),
    getPosition: build.query({
      queryFn: async ({ id = "", isStart = true }) => {
        if (isStart) {
          try {
            const response = await PositionService.getOne(id);
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
              { ...result, type: "Positions", id: result?.id },
              { type: "Positions", id: "LIST" },
            ]
          : [{ type: "Positions", id: "LIST" }],
    }),
    // addDepartment: build.mutation({
    //   queryFn: async (body) => {
    //     try {
    //       const response = await DepartmentService.create(body);
    //       return { data: response };
    //     } catch (e) {
    //       return { error: e.message };
    //     }
    //   },
    //   invalidatesTags: [{ type: "Departments", id: "LIST" }],
    // }),
    // deleteDepartment: build.mutation({
    //   queryFn: async (body) => {
    //     try {
    //       const response = await DepartmentService.delete(body);
    //       return { data: response };
    //     } catch (e) {
    //       return { error: e.message };
    //     }
    //   },
    //   invalidatesTags: [{ type: "Departments", id: "LIST" }],
    // }),
    // updateDepartment: build.mutation({
    //   queryFn: async (body) => {
    //     try {
    //       const response = await DepartmentService.update(body);
    //       return { data: response };
    //     } catch (e) {
    //       return { error: e.message };
    //     }
    //   },
    //   invalidatesTags: [{ type: "Departments", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetPositionQuery,
  //   useAddDepartmentMutation,
  //   useUpdateDepartmentMutation,
  //   useDeleteDepartmentMutation,
} = positionsApi;
