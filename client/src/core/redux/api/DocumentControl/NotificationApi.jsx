import { createApi } from "@reduxjs/toolkit/query/react";
import NotificationService from "../../../../services/DocumentControlServices/NotificationService";

const TAG_TYPE = "Notification";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  tagTypes: [TAG_TYPE],
  // Кеш протухает через секунду
  keepUnusedDataFor: 10,
  endpoints: (build) => ({
    getUnreadNotifications: build.query({
      queryFn: async (props) => {
        const { isGetNotificationCount = true } = props;
        try {
          const response = await NotificationService.getUnreadNotifications(
            isGetNotificationCount
          );
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
      providesTags: (result) =>
        result
          ? [
              { ...result, type: TAG_TYPE, id: result?.id },
              { type: TAG_TYPE, id: "LIST" },
            ]
          : [{ type: TAG_TYPE, id: "LIST" }],
    }),
    // Не используется, оставлено в качестве напоминания использовать при переходе на кэш
    readNotifications: build.query({
      queryFn: async (props) => {
        const { notificationType, documentId } = props;
        const response = await NotificationService.readNotifications({
          notificationType,
          documentId,
        });
        return { data: response };
      },
    }),
  }),
});

export const { useGetUnreadNotificationsQuery, useReadNotificationsMutation } =
  notificationsApi;

export const useGetUnreadNotificationsQueryHook =
  useGetUnreadNotificationsQuery;

/**
 * `useUpdateDocumentMutationHook` Хук
 */
export const useReadNotificationsMutationHook = useReadNotificationsMutation;
