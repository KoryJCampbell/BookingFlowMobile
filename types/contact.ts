export type ContactType = "artist" | "venue" | "agent" | "promoter" | "other";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  type: ContactType;
  organization: string | null;
  notes: string;
  tags: string[];
  lastContactedAt: string | null;
  conversationCount: number;
  createdAt: string;
}
