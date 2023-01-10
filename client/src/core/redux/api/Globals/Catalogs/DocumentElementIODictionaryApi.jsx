import { createApi } from "@reduxjs/toolkit/query/react";
import PositionService from "../../../../../services/AdminServices/PositionService";

const TAG_TYPE = "Document_element_IO_dictionary";

export const documentElementIODictionaryApi = createApi({
	reducerPath: "documentElementIODictionaryApi",
	tagTypes: [TAG_TYPE],
	endpoints: (build) => ({
		getDocumentElementIODictionaries: build.query({
			queryFn: async (props = {}) => {
				try {
					const { isAddForeignTables = false, isAddRights = false } = props;
					const response = await PositionService.getAll({
						isAddForeignTables,
						isAddRights,
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

		getDocumentElementIODictionary: build.query({
			queryFn: async ({
				id = "",
				currentRow = {},
				isStart = true,
				isAddRights = false,
			}) => {
				if (isStart) {
					try {
						const response = await PositionService.getOne({
							id: id || currentRow?.position_id,
							isAddRights,
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

		addDocumentElementIODictionary: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await PositionService.create(body);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		deleteDocumentElementIODictionary: build.mutation({
			queryFn: async (body) => {
				try {
					const response = await PositionService.delete(body);
					return { data: response };
				} catch (e) {
					return { error: e.message };
				}
			},
			invalidatesTags: [{ type: TAG_TYPE, id: "LIST" }],
		}),

		updateDocumentElementIODictionary: build.mutation({
			queryFn: async (body) => {
				try {
					const bodyPrepared = (bodyValues) => ({
						...bodyValues,
						position_id:
							bodyValues?.position_id || bodyValues?.currentRow?.position_id,
					});
					const response = await PositionService.update(bodyPrepared(body));
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
	getDocumentElementIODictionaries,
	getDocumentElementIODictionary,
	addDocumentElementIODictionary,
	deleteDocumentElementIODictionary,
	updateDocumentElementIODictionary,
} = documentElementIODictionaryApi;

export const useGetPositionsQueryHook = getDocumentElementIODictionaries;

export const useGetPositionQueryHook = getDocumentElementIODictionary;

export const useAddPositionMutationHook = addDocumentElementIODictionary;

export const useUpdatePositionMutationHook = deleteDocumentElementIODictionary;

export const useDeletePositionMutationHook = updateDocumentElementIODictionary;
