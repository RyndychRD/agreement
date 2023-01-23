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

    getDocumentTypeView: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentTypesViewsService.getOne({
              id: id || currentRow?.type_view_id,
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
  }),
});

const { useGetDocumentTypesViewsQuery, useGetDocumentTypeViewQuery } =
  documentTypesViewsApi;

// TODO: Доделать документацию
export const useGetDocumentTypesViewsHook = useGetDocumentTypesViewsQuery;
// TODO: Доделать документацию
export const useGetDocumentTypeViewHook = useGetDocumentTypeViewQuery;
