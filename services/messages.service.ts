import type { Message, ReplyTemplate } from "@/types/message";
import { mockMessages, mockTemplates } from "@/mocks/messages";
import { delay } from "@/lib/utils";

const SIMULATED_DELAY = 300;

export async function getMessages(conversationId: string): Promise<Message[]> {
  await delay(SIMULATED_DELAY);
  return mockMessages[conversationId] ?? [];
}

export async function sendMessage(
  conversationId: string,
  content: string,
): Promise<Message> {
  await delay(SIMULATED_DELAY);
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId: "user-1",
    senderName: "Kory Campbell",
    senderAvatarUrl: null,
    content,
    channel: "in_app",
    direction: "outbound",
    createdAt: new Date().toISOString(),
    isRead: true,
  };

  if (!mockMessages[conversationId]) {
    mockMessages[conversationId] = [];
  }
  mockMessages[conversationId].push(newMessage);

  return newMessage;
}

export async function getTemplates(): Promise<ReplyTemplate[]> {
  await delay(SIMULATED_DELAY);
  return mockTemplates;
}
