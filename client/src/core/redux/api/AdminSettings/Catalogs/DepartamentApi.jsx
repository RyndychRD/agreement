import { createApi } from "@reduxjs/toolkit/query/react";
import DepartmentService from "../../../../../services/AdminServices/DepartmentService";

export const departmentsApi = createApi({
  reducerPath: "departmentsApi",
  tagTypes: ["Departments"],
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
              ...result.map(({ id }) => ({ type: "Departments", id })),
              { type: "Departments", id: "LIST" },
            ]
          : [{ type: "Departments", id: "LIST" }],
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
              { ...result, type: "Departments", id: result?.id },
              { type: "Departments", id: "LIST" },
            ]
          : [{ type: "Departments", id: "LIST" }],
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
      invalidatesTags: [{ type: "Departments", id: "LIST" }],
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
      invalidatesTags: [{ type: "Departments", id: "LIST" }],
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
      invalidatesTags: [{ type: "Departments", id: "LIST" }],
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
