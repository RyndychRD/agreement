import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentService from "../../../../../services/DocumentServices/DocumentService";

const TAG_TYPE = "Documents";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getDocuments: build.query({
      queryFn: async ({
        status = 0,
        isAddForeignTables = false,
        isAddDocumentData = false,
        isShowAllDocs = false,
        isOnlyForSigningDocuments = false,
        isOnlyMySignedDocuments = false,
      }) => {
        try {
          const response = await DocumentService.getAll({
            status,
            isAddForeignTables,
            isAddDocumentData,
            isShowAllDocs,
            isOnlyForSigningDocuments,
            isOnlyMySignedDocuments,
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
    getDocument: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentService.getOne(
              id || currentRow?.Document_id
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
    addDocument: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    deleteDocument: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    updateDocument: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            Document_id:
              bodyValues?.Document_id || bodyValues?.currentRow?.Document_id,
          });
          const response = await DocumentService.update(bodyPrepared(body));
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
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useAddDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = documentsApi;

/**
 * `useGetRoutesQueryHook` Хук для запроса всех данных по документам
 */
export const useGetDocumentsQueryHook = useGetDocumentsQuery;

/**
 * `useGetDocumentQueryHook` Хук для запроса данных по документу
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
 * useGetRouteQueryHook(data)
 */
export const useGetDocumentQueryHook = useGetDocumentQuery;

/**
 * `useAddDocumentMutationHook` Хук
 */
export const useAddDocumentMutationHook = useAddDocumentMutation;

/**
 * `useUpdateDocumentMutationHook` Хук
 */
export const useUpdateDocumentMutationHook = useUpdateDocumentMutation;

/**
 * `useDeleteDocumentMutationHook` Хук для удаления документа
 */
export const useDeleteDocumentMutationHook = useDeleteDocumentMutation;
