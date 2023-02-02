import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentTasksService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentTasksService/DocumentTaskService";

const TAG_TYPE = "DocumentTasks";

export const documentTasksApi = createApi({
  reducerPath: "documentTasksApi",
  tagTypes: [TAG_TYPE],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    getMyDocumentTasks: build.query({
      queryFn: async ({ isAddForeignTables = false }) => {
        try {
          const response = await DocumentTasksService.getMyTasks({
            isAddForeignTables,
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
  }),
});

export const { useGetMyDocumentTasksQuery } = documentTasksApi;

export const useGetMyDocumentTasksQueryHook = useGetMyDocumentTasksQuery;
