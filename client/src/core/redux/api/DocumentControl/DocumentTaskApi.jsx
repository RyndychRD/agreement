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
    getCompletedDocumentTasks: build.query({
      queryFn: async ({ isAddForeignTables = false, isOnlyMyTasks = true }) => {
        try {
          const response = await DocumentTasksService.getCompletedDocumentTasks(
            {
              isAddForeignTables,
              isOnlyMyTasks,
            }
          );
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
      queryFn: async (props) => {
        const {
          isConfirmedForSecondPageOnly = false,
          isAddForeignTables = false,
          documentId,
        } = props;
        try {
          const response =
            await DocumentTasksService.getDocumentTasksByDocumentId({
              isAddForeignTables,
              isConfirmedForSecondPageOnly,
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
            documentTaskFileIds: bodyValues.files?.fileList.map(
              (file) => file.response.fileId
            ),
            isSecondPageAgreementFromCustomFieldsConfirmed:
              body.isSecondPageAgreementFromCustomFieldsConfirmed,
            // В это поле кладутся вообще все дополнительные значения, в итоге получается грязно, но рабоче. Если передан undefined, то поле пропускается
            customFields: {
              budgetSumNoNDS: bodyValues.budgetSumNoNDS
                ? parseInt(bodyValues.budgetSumNoNDS, 10)
                : undefined,
              budgetSumWithNDS: bodyValues.budgetSumWithNDS,
              contractSumNoNDS: bodyValues.contractSumNoNDS
                ? parseInt(bodyValues.contractSumNoNDS, 10)
                : undefined,
              contractSumWithNDS: bodyValues.contractSumWithNDS,
              currentNDS: bodyValues.currentNDS
                ? parseInt(bodyValues.currentNDS, 10)
                : undefined,
              exchangeRates: bodyValues.exchangeRates,
              fullNameOfTheItemInBudget: bodyValues.fullNameOfTheItemInBudget,
              remark: bodyValues.remark,
              registrationDate: bodyValues.registrationDate,
              registrationNumber: bodyValues.registrationNumber,
            },
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
  useGetCompletedDocumentTasksQuery,
  useGetDocumentTasksByDocumentQuery,
  useGetDocumentTaskQuery,
  useDeleteDocumentTaskMutation,
  useAddDocumentTaskMutation,
  useCompleteDocumentTaskMutation,
} = documentTasksApi;

/**
 * Хук для взятия входящий поручений этого пользователя
 */
export const useGetIncomeDocumentTasksQueryHook =
  useGetIncomeDocumentTasksQuery;

/**
 * Хук для взятия поручений, которые выполнил этот пользователь
 */
export const useGetCompletedDocumentTasksQueryHook =
  useGetCompletedDocumentTasksQuery;

/**
 * Хук для того, чтобы взять поручения по выбранному документу
 */
export const useGetDocumentTasksByDocumentQueryHook =
  useGetDocumentTasksByDocumentQuery;

/**
 * Хук для взятия поручения по id
 */
export const useGetDocumentTaskQueryHook = useGetDocumentTaskQuery;

/**
 * Хук для удаления поручения
 */
export const useDeleteDocumentTaskMutationHook = useDeleteDocumentTaskMutation;
/**
 * Хук для создания поручения
 */
export const useAddDocumentTaskMutationHook = useAddDocumentTaskMutation;
/**
 * Хук для завершения поручения
 */
export const useCompleteDocumentTaskMutationHook =
  useCompleteDocumentTaskMutation;
