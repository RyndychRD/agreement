import { createApi } from "@reduxjs/toolkit/query/react";
import FAQService from "../../../../../services/AdminServices/FAQService";

const TAG_TYPE = "FAQ";

export const FAQsApi = createApi({
  reducerPath: "FAQApi",
  tagTypes: [TAG_TYPE],
  keepUnusedDataFor: 1,
  endpoints: (build) => ({
    getFAQs: build.query({
      queryFn: async () => {
        try {
          const response = await FAQService.getAll();
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
  }),
});

export const { useGetFAQsQuery } = FAQsApi;

export const useGetFAQsQueryHook = useGetFAQsQuery;
