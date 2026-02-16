import type { PipelineStage } from "./pipeline";

export type Channel =
  | "email"
  | "sms"
  | "instagram"
  | "whatsapp"
  | "phone"
  | "in_app";

export type ConversationStatus = "active" | "archived" | "snoozed";

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatarUrl: string | null;
  subject: string;
  lastMessage: string;
  lastMessageAt: string;
  channel: Channel;
  status: ConversationStatus;
  isRead: boolean;
  unreadCount: number;
  pipelineStage: PipelineStage | null;
  tags: string[];
}
