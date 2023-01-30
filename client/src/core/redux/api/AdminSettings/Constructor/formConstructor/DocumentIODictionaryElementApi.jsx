import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentIODictionaryElementsService from "../../../../../../services/AdminServices/constructor/formConstructor/DocumentIODictionaryElementService";

const TAG_TYPE = "documentIODictionaryElement";

export const documentIODictionaryElementApi = createApi({
  reducerPath: "documentIODictionaryElementApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getDocumentIODictionaryElements: build.query({
      queryFn: async () => {
        try {
          const response = await DocumentIODictionaryElementsService.getAll();
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

    getDocumentIODictionaryElement: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentIODictionaryElementsService.getOne({
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

const {
  useGetDocumentIODictionaryElementsQuery,
  useGetDocumentIODictionaryElementQuery,
} = documentIODictionaryElementApi;

// TODO: Доделать документацию
export const useGetDocumentIODictionaryElementsHook =
  useGetDocumentIODictionaryElementsQuery;
// TODO: Доделать документацию
export const useGetDocumentIODictionaryElementHook =
  useGetDocumentIODictionaryElementQuery;
