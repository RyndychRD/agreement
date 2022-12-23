import { createApi } from "@reduxjs/toolkit/query/react";
import DepartmentService from "../../../../../services/AdminServices/DepartmentService";

const TAG_TYPE = "Departments";

export const departmentsApi = createApi({
  reducerPath: "departmentsApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getDepartments: build.query({
      queryFn: async () => {
        try {
          const response = await DepartmentService.getAll();
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
    getDepartment: build.query({
      queryFn: async ({ id = "", isStart = true }) => {
        if (isStart) {
          try {
            const response = await DepartmentService.getOne(id);
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
    addDepartment: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DepartmentService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    deleteDepartment: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DepartmentService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    updateDepartment: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DepartmentService.update(body);
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
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;
