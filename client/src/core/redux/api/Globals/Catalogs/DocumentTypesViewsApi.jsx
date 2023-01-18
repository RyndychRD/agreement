import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentTypesViewsService from "../../../../../services/DocumentServices/DocumentTypeViewsService";

const TAG_TYPE = "documentTypesViews";

export const documentTypesViewsApi = createApi({
  reducerPath: "documentTypesViewsApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getDocumentTypesViews: build.query({
      queryFn: async () => {
        try {
          const response = await DocumentTypesViewsService.getAll();
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

    getDocumentTypeView: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentTypesViewsService.getOne({
              id: id || currentRow?.position_id,
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

    updateDocumentTypeView: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            position_id:
              bodyValues?.position_id || bodyValues?.currentRow?.position_id,
          });
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
  }),
});

const {
  useGetDocumentTypesViewsQuery,
  useGetDocumentTypeViewQuery,
  useAddDocumentTypeViewQuery,
  useDeleteDocumentTypeViewQuery,
  useUpdateDocumentTypeViewQuery,
} = documentTypesViewsApi;

// TODO: Доделать документацию
export const useGetDocumentTypesViewsHook = useGetDocumentTypesViewsQuery;
// TODO: Доделать документацию
export const useGetDocumentTypeViewHook = useGetDocumentTypeViewQuery;
// TODO: Доделать документацию
export const useAddDocumentTypeViewHook = useAddDocumentTypeViewQuery;
// TODO: Доделать документацию
export const useDeleteDocumentTypeViewHook = useDeleteDocumentTypeViewQuery;
// TODO: Доделать документацию
export const useUpdateDocumentTypeViewHook = useUpdateDocumentTypeViewQuery;
