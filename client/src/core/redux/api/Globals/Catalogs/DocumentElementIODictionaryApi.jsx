import { createApi } from "@reduxjs/toolkit/query/react";
import DocumentElementIODictionaryService from "../../../../../services/DocumentServices/DocumentElementIODictionaryService";

const TAG_TYPE = "DocumentElement";

export const documentElementApi = createApi({
	reducerPath: "documentElementApi",
	tagTypes: [TAG_TYPE],
	endpoints: (build) => ({
		getElements: build.query({
			queryFn: async () => {
				try {
					const response = await DocumentElementIODictionaryService.getAll();
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

		getElement: build.query({
			queryFn: async ({ id = "", currentRow = {}, isStart = true }) => {
				if (isStart) {
					try {
						const response = await DocumentElementIODictionaryService.getOne({
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

		addElement: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await DocumentElementIODictionaryService.create(
						body
					);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		deleteElement: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await DocumentElementIODictionaryService.delete(
						body
					);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		updateElement: build.mutation({
			queryFn: async (body) => {
				try {
					const bodyPrepared = (bodyValues) => ({
						...bodyValues,
						position_id:
							bodyValues?.position_id || bodyValues?.currentRow?.position_id,
					});
					const response = await DocumentElementIODictionaryService.update(
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
	useGetElementsQuery,
	useGetElementQuery,
	useAddElementsQuery,
	useDeleteElementQuery,
	useUpdateElementQuery,
} = documentElementApi;

// TODO: Доделать документацию
export const useGetElementsHook = useGetElementsQuery;
// TODO: Доделать документацию
export const useGetElementHook = useGetElementQuery;
// TODO: Доделать документацию
export const useAddElementHook = useAddElementsQuery;
// TODO: Доделать документацию
export const useDeleteElementHook = useDeleteElementQuery;
// TODO: Доделать документацию
export const useUpdateElementHook = useUpdateElementQuery;
