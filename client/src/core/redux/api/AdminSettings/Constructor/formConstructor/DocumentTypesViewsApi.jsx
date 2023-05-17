import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentTypesViewsService from "../../../../../../services/AdminServices/constructor/formConstructor/DocumentTypeViewsService";

const TAG_TYPE = "documentTypesViews";

export const documentTypesViewsApi = createApi({
  reducerPath: "documentTypesViewsApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getDocumentTypesViews: build.query({
      queryFn: async ({ isAddForeignTables = false }) => {
        try {
          const response = await DocumentTypesViewsService.getAll({
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
    getDocumentTypeViewByDocumentType: build.query({
      queryFn: async ({ typeId = "" }) => {
        try {
          const response = await DocumentTypesViewsService.getOneByTypeId(
            typeId
          );
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: (result) =>
        result
          ? [
              { ...result, type: TAG_TYPE, id: result?.id },
              { type: TAG_TYPE, id: "LIST" },
            ]
          : [{ type: TAG_TYPE, id: "LIST" }],
    }),
    getDocumentTypeView: build.query({
      queryFn: async ({
        id = "",
        currentRow = {},
        isStart = true,
        isAddForeignTables = true,
      }) => {
        if (isStart) {
          try {
            const response = await DocumentTypesViewsService.getOne({
              id: id || currentRow?.type_view_id,
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
              { ...result, type: TAG_TYPE, id: result?.id },
              { type: TAG_TYPE, id: "LIST" },
            ]
          : [{ type: TAG_TYPE, id: "LIST" }],
    }),
    addDocumentTypeView: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentTypesViewsService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    updateDocumentTypeView: build.mutation({
      queryFn: async (body) => {
        const bodyPrepared = (bodyValues) => ({
          ...bodyValues,
          type_view_id:
            bodyValues?.type_view_id || bodyValues?.currentRow?.type_view_id,
        });
        try {
          const response = await DocumentTypesViewsService.update(
            bodyPrepared(body)
          );
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    deleteDocumentTypeView: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentTypesViewsService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
  }),
});

const {
  useGetDocumentTypesViewsQuery,
  useGetDocumentTypeViewQuery,
  useGetDocumentTypeViewByDocumentTypeQuery,
  useAddDocumentTypeViewMutation,
  useUpdateDocumentTypeViewMutation,
  useDeleteDocumentTypeViewMutation,
} = documentTypesViewsApi;

/**
 * Вытаскивает все сформированные view для типа
 * @param isAddForeignTables Добавлять ли значения по foreign ключам
 */
export const useGetDocumentTypesViewsHook = useGetDocumentTypesViewsQuery;

/**
 * Вытащить значение по id или по currentRow?.type_view_id
 *@param id
 *@param currentRow
 *@param isStart
 *@param isAddForeignTables Добавлять ли значения по foreign ключам
 */
export const useGetDocumentTypeViewHook = useGetDocumentTypeViewQuery;

/**
 * Вытаскивает значение по типу документа
 * @param typeId
 */
export const useGetDocumentTypeViewByDocumentTypeHook =
  useGetDocumentTypeViewByDocumentTypeQuery;

/**
 * Добавляет новый view для типа
 * @param body
 */
export const useAddDocumentTypeViewHook = useAddDocumentTypeViewMutation;

/**
 * Обновляет view для типа
 *  @param body
 */
export const useUpdateDocumentTypeViewHook = useUpdateDocumentTypeViewMutation;

/**
 * Удаляет view для типа
 *  @param body
 */
export const useDeleteDocumentTypeViewHook = useDeleteDocumentTypeViewMutation;
