import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentTasksService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentTasksService/DocumentTaskService";

const TAG_TYPE = "DocumentTasks";

export const documentTasksApi = createApi({
  reducerPath: "documentTasksApi",
  tagTypes: [TAG_TYPE],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    getIncomeDocumentTasks: build.query({
      queryFn: async ({ isAddForeignTables = false }) => {
        try {
          const response = await DocumentTasksService.getIncomeDocumentTasks({
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
    getDocumentTasksByDocument: build.query({
      queryFn: async ({ isAddForeignTables = false, documentId }) => {
        try {
          const response =
            await DocumentTasksService.getDocumentTasksByDocumentId({
              isAddForeignTables,
              documentId,
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
    getDocumentTask: build.query({
      queryFn: async ({
        id = "",
        currentRow = {},
        isStart = true,
        isAddForeignTables = false,
        isAddDocumentValues = false,
        isAddDocumentFiles = false,
      }) => {
        if (isStart) {
          try {
            const response = await DocumentTasksService.getDocumentTask({
              id: id || currentRow?.document_task_id,
              isAddForeignTables,
              isAddDocumentValues,
              isAddDocumentFiles,
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
    deleteDocumentTask: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentTasksService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    addDocumentTask: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentTasksService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    completeDocumentTask: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            result: bodyValues.result,
            documentTaskId: bodyValues?.id
              ? bodyValues.id
              : bodyValues.currentRow.document_task_id,
            documentTaskStatusId: 2,
            documentTaskFileIds: bodyValues.files.fileList.map(
              (file) => file.response.fileId
            ),
          });
          const response = await DocumentTasksService.update(
            bodyPrepared(body)
          );
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
  useGetIncomeDocumentTasksQuery,
  useGetDocumentTasksByDocumentQuery,
  useGetDocumentTaskQuery,
  useDeleteDocumentTaskMutation,
  useAddDocumentTaskMutation,
  useCompleteDocumentTaskMutation,
} = documentTasksApi;

export const useGetIncomeDocumentTasksQueryHook =
  useGetIncomeDocumentTasksQuery;

export const useGetDocumentTasksByDocumentQueryHook =
  useGetDocumentTasksByDocumentQuery;
export const useGetDocumentTaskQueryHook = useGetDocumentTaskQuery;

export const useDeleteDocumentTaskMutationHook = useDeleteDocumentTaskMutation;
export const useAddDocumentTaskMutationHook = useAddDocumentTaskMutation;
export const useCompleteDocumentTaskMutationHook =
  useCompleteDocumentTaskMutation;
