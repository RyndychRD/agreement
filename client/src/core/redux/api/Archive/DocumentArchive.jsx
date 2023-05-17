import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentService from "../../../../services/DocumentControlServices/DocumentsServices/DocumentService";

const TAG = "DocumentArchiveFiles";

export const documentArchivesApi = createApi({
  reducerPath: "documentArchivesApi",
  tagTypes: [TAG],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    getDocumentArchives: build.query({
      queryFn: async ({ archiveTypes = [], dateRange = {} }) => {
        if (!archiveTypes || !dateRange) return { data: [] };
        try {
          const response = await DocumentService.getAllForArchive({
            archiveTypes,
            dateRange,
          });
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TAG, id })),
              { type: TAG, id: "LIST" },
            ]
          : [{ type: TAG, id: "LIST" }],
    }),
  }),
});

export const { useGetDocumentArchivesQuery } = documentArchivesApi;

/**
 * Хук для запроса документов в архиве
 * @param archiveTypes типы архива
 * @param dateRange промежуток дат
 */
export const useGetDocumentArchivesQueryHook = useGetDocumentArchivesQuery;
