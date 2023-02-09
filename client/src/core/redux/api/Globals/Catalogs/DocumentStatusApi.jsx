import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentStatusService from "../../../../../services/DocumentControlServices/DocumentsServices/DocumentStatusService";

const TAG_TYPE = "documentStatus";

export const documentStatusApi = createApi({
  reducerPath: "documentStatusApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getStatuses: build.query({
      queryFn: async () => {
        try {
          const response = await DocumentStatusService.getAll();
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

    getStatus: build.query({
      queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
        if (isStart) {
          try {
            const response = await DocumentStatusService.getOne({
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

    addStatus: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentStatusService.create(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    deleteStatus: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentStatusService.delete(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),

    updateStatus: build.mutation({
      queryFn: async (body) => {
        try {
          const bodyPrepared = (bodyValues) => ({
            ...bodyValues,
            position_id:
              bodyValues?.position_id || bodyValues?.currentRow?.position_id,
          });
          const response = await DocumentStatusService.update(
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
  useGetStatusesQuery,
  useGetStatusQuery,
  useAddStatusesQuery,
  useDeleteStatusQuery,
  useUpdateStatusQuery,
} = documentStatusApi;

// TODO: Доделать документацию
export const useGetStatusesHook = useGetStatusesQuery;
// TODO: Доделать документацию
export const useGetStatusHook = useGetStatusQuery;
// TODO: Доделать документацию
export const useAddStatusHook = useAddStatusesQuery;
// TODO: Доделать документацию
export const useDeleteStatusHook = useDeleteStatusQuery;
// TODO: Доделать документацию
export const useUpdateStatusHook = useUpdateStatusQuery;
