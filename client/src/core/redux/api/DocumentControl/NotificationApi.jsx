import { createApi } from "@reduxjs/toolkit/query/react";
import NotificationService from "../../../../services/DocumentServices/NotificationService";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  tagTypes: [
    "RejectedDocument",
    "ReworkDocument",
    "ApprovedDocument",
    "OnRegistrationDocument",
    "OOPZDocument",
    "CompletedDocument",
    "Signing",
  ],
  endpoints: (build) => ({
    getUnreadNotificationsByType: build.query({
      queryFn: async (props) => {
        const { notificationType, isGetNotificationCount = true } = props;
        try {
          // `isAddRights` Флаг true включает параметризированный запрос
          const response =
            await NotificationService.getUnreadNotificationsByType(
              notificationType,
              isGetNotificationCount
            );
          return { data: response };
        } catch (e) {
          return { error: e.message };
        }
      },
    }),
  }),
});

export const { useGetUnreadNotificationsByTypeQuery } = notificationsApi;

export const useGetUnreadNotificationsByTypeQueryHook =
  useGetUnreadNotificationsByTypeQuery;
