export type NotificationType = "Placement" | "Result" | "Event";

export interface CampusNotification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: NotificationType;
}
