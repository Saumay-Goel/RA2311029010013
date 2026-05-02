import { CampusNotification, FetchNotificationsParams } from "../types";
import { logInfo, logError } from "@/utils/logger";

export const fetchNotifications = async (
  params?: FetchNotificationsParams,
): Promise<CampusNotification[]> => {
  logInfo(
    "api",
    `Initiating fetch with params: ${JSON.stringify(params ?? {})}`,
  );

  try {
    const url = new URL("/api/notifications", window.location.origin);

    // Only append if valid values
    if (params?.limit && params.limit > 0)
      url.searchParams.append("limit", params.limit.toString());
    if (params?.page && params.page > 0)
      url.searchParams.append("page", params.page.toString());
    if (params?.notification_type && params.notification_type)
      url.searchParams.append("notification_type", params.notification_type);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as {
      notifications: CampusNotification[];
    };

    logInfo(
      "api",
      `Successfully fetched ${data.notifications?.length ?? 0} notifications`,
    );
    return data.notifications ?? [];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logError("api", "Failed to fetch notifications", message);
    return [];
  }
};
