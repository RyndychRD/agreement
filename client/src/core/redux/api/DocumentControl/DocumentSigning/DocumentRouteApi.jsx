import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentRouteService from "../../../../../services/DocumentServices/DocumentSigning/DocumentRouteService";

const TAG_TYPE = "DocumentSigningRoute";

export const documentRouteApi = createApi({
  reducerPath: "documentRouteApi",
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
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
              { ...result, type: TAG_TYPE, id: result?.id },
              { type: TAG_TYPE, id: "LIST" },
            ]
          : [{ type: TAG_TYPE, id: "LIST" }],
    }),
    // addDocumentRoute: build.mutation({
    //   queryFn: async (body) => {
    //     try {
    //       const response = await DocumentService.create(body);
    //       return { data: response };
    //     } catch (e) {
    //       return { error: e.message };
    //     }
    //   },
    //   invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    // }),

    signCurrentDocumentStep: build.mutation({
      queryFn: async (body) => {
        try {
          const response = await DocumentRouteService.signCurrentStep(body);
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    }),
    // updateDocumentRoute: build.mutation({
    //   queryFn: async (body) => {
    //     try {
    //       const bodyPrepared = (bodyValues) => ({
    //         ...bodyValues,
    //         Document_id:
    //           bodyValues?.Document_id || bodyValues?.currentRow?.Document_id,
    //       });
    //       const response = await DocumentService.update(bodyPrepared(body));
    //       return { data: response };
    //     } catch (e) {
    //       return { error: e.message };
    //     }
    //   },
    //   invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
    // }),
  }),
});

export const {
  useGetDocumentRouteQuery,
  useAddDocumentRouteMutation,
  useUpdateDocumentRouteMutation,
  useSignCurrentDocumentStepMutation,
} = documentRouteApi;

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

/**
 * `useAddDocumentMutationHook` Хук
 */
export const useAddDocumentRouteMutationHook = useAddDocumentRouteMutation;

/**
 * `useUpdateDocumentMutationHook` Хук
 */
export const useUpdateDocumentRouteMutationHook =
  useUpdateDocumentRouteMutation;
/**
 * Для текущего неподписанного шага устанавливает подписантом текущего пользователя и сохраняет мету по подписанию документа
 */
export const useSignCurrentDocumentStepMutationHook =
  useSignCurrentDocumentStepMutation;
