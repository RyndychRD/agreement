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
        isShowDeletedDocs = false,
        isOnlyForSigningDocuments = false,
        isOnlyMySignedDocuments = false,
        isFindContractorInValues = false,
        addDocumentTasksByType = -1,
      }) => {
        try {
          const response = await DocumentService.getAll({
            status,
            isAddForeignTables,
            isShowAllDocs,
            isOnlyForSigningDocuments,
            isOnlyMySignedDocuments,
            isShowDeletedDocs,
            // Ищем поставщика(Suppliers_of_Goods_Works_Services) в document_values и возвращаем первого попавщегося. По идее, это поле должно быть только одно
            isFindContractorInValues,
            // Если передан тип - то только его. Если не передано или передано -1 - ничего. Если передан all - все
            addDocumentTasksByType,
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

    deleteDocumentSoft: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            document_id: bodyValues.document_id,
            newDocumentStatusId: 13,
            previousDocumentStatusId: bodyValues.document_status_id,
          });
          const response = await DocumentService.update(bodyPrepared(body));
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
    putDocumentRegistrationAndChangeStatus: build.mutation({
      queryFn: async (values) => {
        try {
          const response = await DocumentService.setRegistrationAndChangeStatus(
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
  useDeleteDocumentSoftMutation,

  useSignCurrentDocumentStepMutation,
  useGetDocumentRouteQuery,
  useGetDocumentValuesQuery,
  useGetDocumentFilesQuery,
  useAddDocumentFilesMutation,
  useUpdateDocumentRouteMutation,
  usePushDocumentTaskFileToDocumentMutation,
  usePutDocumentRegistrationAndChangeStatusMutation,
  useSetDocumentArchiveTypeMutation,
} = documentsApi;

/**
 *  Хук для запроса всех данных по документам
 * @param status
 * @param isAddForeignTables добавлять ли данные по foreign keys
 * @param isShowAllDocs Показывать ли все документы, а не только те, которые предназначены только этому пользователю
 * @param isShowDeletedDocs Показывать документы в статусе Удаленные
 * @param isOnlyForSigningDocuments показывать только документы, которые предназначены для подписания этому пользователю
 * @param isOnlyMySignedDocuments показывать то те документы, в подписании которых участвовал этот пользователь
 * @param isFindContractorInValues хотелка Иммамовой. Найти в values документа первое значение с типом Поставщик
 * @param addDocumentTasksByType Выгрузить ли поручения, привязанные к каждому из рассматриваемых документов. Используется для отображения количества выполненных и поставленных поручений
 */
export const useGetDocumentsQueryHook = useGetDocumentsQuery;

/**
 * `useGetDocumentQueryHook` Хук для запроса данных по документу
 * @param {string} [id=""] Id элемента в таблице департамента
 * @param {string} [currentRow = {}] Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
 * @param {boolean} [isStart=true] Загружаем данные когда нам они нужны
 * @param {boolean} [isAddDocumentData=false]   Флаг true включает параметризированный запрос. Похоже, depricated
 * @param {boolean} [isAddForeignTables=false]   Добавить ли данные по foreign key
 * @example
 */
export const useGetDocumentQueryHook = useGetDocumentQuery;

/**
 * Создать новый документы
 */
export const useAddDocumentMutationHook = useAddDocumentMutation;

/**
 * Добавить файлы в документ
 */
export const useAddDocumentFilesMutationHook = useAddDocumentFilesMutation;

/**
 * Изменить маршрут документа
 */
export const useUpdateDocumentRouteMutationHook =
  useUpdateDocumentRouteMutation;

/**
 * Обновить документ(статус по большей части)
 */
export const useUpdateDocumentMutationHook = useUpdateDocumentMutation;

/**
 * `useDeleteDocumentMutationHook` Хук для удаления документа
 */
export const useDeleteDocumentMutationHook = useDeleteDocumentMutation;
/**
 * `useDeleteDocumentMutationHook` Хук для логического удаления документа
 */
export const useDeleteDocumentSoftMutationHook = useDeleteDocumentSoftMutation;
/**
 * Для текущего неподписанного шага устанавливает подписантом текущего пользователя и сохраняет мету по подписанию документа
 */
export const useSignCurrentDocumentStepMutationHook =
  useSignCurrentDocumentStepMutation;

/**
 * Хук для запроса маршрута по документу
 */
export const useGetDocumentRouteQueryHook = useGetDocumentRouteQuery;

/** Хук для запроса значений по документу */
export const useGetDocumentValuesQueryHook = useGetDocumentValuesQuery;
/** Хук для запроса файлов по документу */
export const useGetDocumentFilesQueryHook = useGetDocumentFilesQuery;
/** Хук для добавления файлов из поручения в документ */
export const usePushDocumentTaskFileToDocumentMutationHook =
  usePushDocumentTaskFileToDocumentMutation;
/** Хук для установки номера и даты регистрации в Митворг */
export const usePutDocumentRegistrationAndChangeStatusMutationHook =
  usePutDocumentRegistrationAndChangeStatusMutation;

/**
 * Хук для установки типа архива для документа. Пока что не используется. Вообще использовался для того чтобы поменять тип архива для документа в любой момент времени пока документ находится в статусе Исполнен
 */
export const useSetDocumentArchiveTypeMutationHook =
  useSetDocumentArchiveTypeMutation;
