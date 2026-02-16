export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: "booker" | "venue_manager" | "artist_manager";
  organizationId: string;
  organizationName: string;
  createdAt: string;
}
