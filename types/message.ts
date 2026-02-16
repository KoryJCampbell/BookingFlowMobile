import type { Channel } from "./conversation";

export type MessageDirection = "inbound" | "outbound";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl: string | null;
  content: string;
  channel: Channel;
  direction: MessageDirection;
  createdAt: string;
  isRead: boolean;
}

export interface ReplyTemplate {
  id: string;
  title: string;
  content: string;
  category:
    | "greeting"
    | "availability"
    | "pricing"
    | "decline"
    | "confirmation"
    | "follow_up";
}
