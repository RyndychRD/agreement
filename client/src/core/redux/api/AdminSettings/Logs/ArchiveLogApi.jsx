import { createApi } from "@reduxjs/toolkit/query/react";
import ArchiveLogTableService from "../../../../../services/AdminServices/ArchiveLogTableService";

const TAG_TYPE = "ArchiveLogs";

export const archiveLogsApi = createApi({
  reducerPath: "archiveLogsApi",
  tagLogs: [TAG_TYPE],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    getArchiveLogs: build.query({
      queryFn: async () => {
        try {
          const response = await ArchiveLogTableService.getAll();
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

    getArchiveLog: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        // `isStart` Загружаем данные когда нам они нужны
        if (isStart) {
          try {
            const response = await ArchiveLogTableService.getOne({
              // Если определенно что выбрано строчка в таблице `currentRow` то передаем ее, иначе ожидается id
              id: id || currentRow?.log_id,
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

export const { useGetArchiveLogsQuery, useGetArchiveLogQuery } = archiveLogsApi;

export const useGetArchiveLogsQueryHook = useGetArchiveLogsQuery;
export const useGetArchiveLogQueryHook = useGetArchiveLogQuery;
