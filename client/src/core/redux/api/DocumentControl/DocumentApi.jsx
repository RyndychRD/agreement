import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentService";
import DocumentRouteService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentRouteService";
import DocumentValuesService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentValuesService";
import DocumentFilesService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentFilesService";
import { SIGN_STEP_BACK_TYPE_ID } from "../../../../components/fragments/documentControl/documentRoute/RouteStepFragmentProvider";

const TAG_TYPE_DOCUMENT = "Documents";
const TAG_TYPE_ROUTE = "DocumentSigningRoute";
const TAG_TYPE_DOCUMENT_VALUES = "DocumentValues";
const TAG_TYPE_DOCUMENT_FILES = "DocumentFiles";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  tagTypes: [
    TAG_TYPE_DOCUMENT,
    TAG_TYPE_ROUTE,
    TAG_TYPE_DOCUMENT_VALUES,
    TAG_TYPE_DOCUMENT_FILES,
  ],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    getDocuments: build.query({
      queryFn: async ({
        status = 0,
        isAddForeignTables = false,
        isShowAllDocs = false,
        isOnlyForSigningDocuments = false,
        isOnlyMySignedDocuments = false,
      }) => {
        try {
          const response = await DocumentService.getAll({
            status,
            isAddForeignTables,
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
              ...result.map(({ id }) => ({ type: TAG_TYPE_DOCUMENT, id })),
              { type: TAG_TYPE_DOCUMENT, id: "LIST" },
            ]
          : [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
    }),

    getDocument: build.query({
      queryFn: async ({
        id = "",
        currentRow = {},
        isStart = true,
        isAddDocumentData = false,
        isAddForeignTables = false,
      }) => {
        if (isStart) {
          try {
            const response = await DocumentService.getOne({
              id: id || currentRow?.document_id,
              isAddDocumentData,
              isAddForeignTables,
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
              { ...result, type: TAG_TYPE_DOCUMENT, id: result?.id },
              { type: TAG_TYPE_DOCUMENT, id: "LIST" },
            ]
          : [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
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
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
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
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
    }),

    updateDocument: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            document_id:
              bodyValues?.document_id || bodyValues?.currentRow?.document_id,
          });
          const response = await DocumentService.update(bodyPrepared(body));
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
    }),

    signCurrentDocumentStep: build.mutation({
      queryFn: async (body) => {
        try {
          let response = [];
          if (body.signatureTypeId !== SIGN_STEP_BACK_TYPE_ID) {
            response = await DocumentRouteService.signCurrentStep(body);
          } else {
            response = await DocumentRouteService.unsignLastStep(body);
          }
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [
        { type: TAG_TYPE_DOCUMENT, id: "LIST" },
        { type: TAG_TYPE_ROUTE, id: "LIST" },
      ],
    }),

    getDocumentRoute: build.query({
      queryFn: async ({ documentId = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentRouteService.getOne(
              documentId || currentRow?.document_id
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
              { ...result, type: TAG_TYPE_ROUTE, id: result?.id },
              { type: TAG_TYPE_ROUTE, id: "LIST" },
            ]
          : [{ type: TAG_TYPE_ROUTE, id: "LIST" }],
    }),
    getDocumentValues: build.query({
      queryFn: async ({
        documentId = "",
        currentRow = {},
        isStart = true,
        isGetConnectedTables = false,
      }) => {
        if (isStart) {
          try {
            const response = await DocumentValuesService.getOneDocumentValues({
              documentId: documentId || currentRow?.document_id,
              isGetConnectedTables,
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
              { ...result, type: TAG_TYPE_DOCUMENT_VALUES, id: result?.id },
              { type: TAG_TYPE_DOCUMENT_VALUES, id: "LIST" },
            ]
          : [{ type: TAG_TYPE_DOCUMENT_VALUES, id: "LIST" }],
    }),

    getDocumentFiles: build.query({
      queryFn: async ({ documentId = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentFilesService.getOneDocumentFiles(
              documentId || currentRow?.document_id
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
              {
                ...result,
                type: TAG_TYPE_DOCUMENT_FILES,
                id: result?.document_id,
              },
              { type: TAG_TYPE_DOCUMENT_FILES, id: "LIST" },
            ]
          : [{ type: TAG_TYPE_DOCUMENT_FILES, id: "LIST" }],
    }),

    pushDocumentTaskFileToDocument: build.mutation({
      queryFn: async (props) => {
        const { documentId, fileId } = props;
        try {
          const response =
            await DocumentFilesService.pushDocumentTaskFileToDocument({
              fileId,
              documentId,
            });
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT_FILES, id: "LIST" }],
    }),

    addDocumentFiles: build.mutation({
      queryFn: async (props) => {
        const { documentId, documentFileIds } = props;
        try {
          const response = await DocumentFilesService.create({
            documentId,
            documentFileIds,
          });
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT_FILES, id: "LIST" }],
    }),
    updateDocumentRoute: build.mutation({
      queryFn: async ({ documentId, routeSteps }) => {
        try {
          const response = await DocumentRouteService.update({
            documentId,
            routeSteps,
          });
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE_ROUTE, id: "LIST" }],
    }),
    putDocumentMitvorgAndChangeStatus: build.mutation({
      queryFn: async (values) => {
        try {
          const response = await DocumentService.setMitvorgAndChangeStatus(
            values
          );
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
    }),
    setDocumentArchiveType: build.mutation({
      queryFn: async (values) => {
        try {
          const response = await DocumentService.setArchiveType(values);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE_DOCUMENT, id: "LIST" }],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useAddDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,

  useSignCurrentDocumentStepMutation,
  useGetDocumentRouteQuery,
  useGetDocumentValuesQuery,
  useGetDocumentFilesQuery,
  useAddDocumentFilesMutation,
  useUpdateDocumentRouteMutation,
  usePushDocumentTaskFileToDocumentMutation,
  usePutDocumentMitvorgAndChangeStatusMutation,
  useSetDocumentArchiveTypeMutation,
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
export const useAddDocumentFilesMutationHook = useAddDocumentFilesMutation;
export const useUpdateDocumentRouteMutationHook =
  useUpdateDocumentRouteMutation;

/**
 * `useUpdateDocumentMutationHook` Хук
 */
export const useUpdateDocumentMutationHook = useUpdateDocumentMutation;

/**
 * `useDeleteDocumentMutationHook` Хук для удаления документа
 */
export const useDeleteDocumentMutationHook = useDeleteDocumentMutation;
/**
 * Для текущего неподписанного шага устанавливает подписантом текущего пользователя и сохраняет мету по подписанию документа
 */
export const useSignCurrentDocumentStepMutationHook =
  useSignCurrentDocumentStepMutation;

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
export const useGetDocumentRouteQueryHook = useGetDocumentRouteQuery;

/** Хук для запроса значений по документу */
export const useGetDocumentValuesQueryHook = useGetDocumentValuesQuery;
/** Хук для запроса файлов по документу */
export const useGetDocumentFilesQueryHook = useGetDocumentFilesQuery;
/** Хук для запроса файлов по документу */
export const usePushDocumentTaskFileToDocumentMutationHook =
  usePushDocumentTaskFileToDocumentMutation;
/** Хук для запроса файлов по документу */
export const usePutDocumentMitvorgAndChangeStatusMutationHook =
  usePutDocumentMitvorgAndChangeStatusMutation;
export const useSetDocumentArchiveTypeMutationHook =
  useSetDocumentArchiveTypeMutation;
