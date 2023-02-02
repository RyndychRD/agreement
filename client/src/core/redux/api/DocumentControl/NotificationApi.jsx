import { createApi } from "@reduxjs/toolkit/query/react";
import NotificationService from "../../../../services/DocumentControlServices/NotificationService";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  tagTypes: ["ReworkDocument", "Signing"],
  endpoints: (build) => ({
    getUnreadNotificationsByType: build.query({
      queryFn: async (props) => {
        const { notificationType, isGetNotificationCount = true } = props;
        if (notificationType) {
          try {
            const response =
              await NotificationService.getUnreadNotificationsByType(
                notificationType,
                isGetNotificationCount
              );
            return { data: response };
          } catch (e) {
            return { error: e.message };
          }
        }
        return {};
      },
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

export const {
  useGetUnreadNotificationsByTypeQuery,
  useReadNotificationsMutation,
} = notificationsApi;

export const useGetUnreadNotificationsByTypeQueryHook =
  useGetUnreadNotificationsByTypeQuery;

/**
 * `useUpdateDocumentMutationHook` Хук
 */
export const useReadNotificationsMutationHook = useReadNotificationsMutation;
