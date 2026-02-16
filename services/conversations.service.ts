import type { Conversation } from "@/types/conversation";
import { mockConversations } from "@/mocks/conversations";
import { delay } from "@/lib/utils";

const SIMULATED_DELAY = 300;

export type InboxFilter = "all" | "bookings" | "unread";

export async function getConversations(
  filter: InboxFilter = "all",
): Promise<Conversation[]> {
  await delay(SIMULATED_DELAY);
  let results = [...mockConversations].filter((c) => c.status !== "archived");

  switch (filter) {
    case "unread":
      results = results.filter((c) => !c.isRead);
      break;
    case "bookings":
      results = results.filter((c) => c.pipelineStage !== null);
      break;
  }

  return results.sort(
    (a, b) =>
      new Date(b.lastMessageAt).getTime() -
      new Date(a.lastMessageAt).getTime(),
  );
}

export async function getConversation(
  id: string,
): Promise<Conversation | null> {
  await delay(SIMULATED_DELAY);
  return mockConversations.find((c) => c.id === id) ?? null;
}

export async function archiveConversation(id: string): Promise<void> {
  await delay(SIMULATED_DELAY);
  const conv = mockConversations.find((c) => c.id === id);
  if (conv) conv.status = "archived";
}

export async function snoozeConversation(
  id: string,
  _until: string,
): Promise<void> {
  await delay(SIMULATED_DELAY);
  const conv = mockConversations.find((c) => c.id === id);
  if (conv) conv.status = "snoozed";
}

export async function markAsRead(id: string): Promise<void> {
  await delay(SIMULATED_DELAY);
  const conv = mockConversations.find((c) => c.id === id);
  if (conv) {
    conv.isRead = true;
    conv.unreadCount = 0;
  }
}

export async function searchConversations(
  query: string,
): Promise<Conversation[]> {
  await delay(SIMULATED_DELAY);
  const lowerQuery = query.toLowerCase();
  return mockConversations.filter(
    (c) =>
      c.contactName.toLowerCase().includes(lowerQuery) ||
      c.subject.toLowerCase().includes(lowerQuery) ||
      c.lastMessage.toLowerCase().includes(lowerQuery),
  );
}
