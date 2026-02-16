export type NotificationType =
  | "new_message"
  | "booking_update"
  | "pipeline_change"
  | "reminder";

export interface PushNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data: {
    conversationId?: string;
    contactId?: string;
    pipelineItemId?: string;
  };
  createdAt: string;
  isRead: boolean;
}
