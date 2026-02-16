import type { User } from "@/types/user";
import { delay } from "@/lib/utils";

const SIMULATED_DELAY = 800;

export interface LoginResponse {
  user: User;
  token: string;
}

export async function login(
  email: string,
  _password: string,
): Promise<LoginResponse> {
  await delay(SIMULATED_DELAY);

  // Mock login — always succeeds
  return {
    user: {
      id: "user-1",
      email,
      name: "Kory Campbell",
      avatarUrl: null,
      role: "booker",
      organizationId: "org-1",
      organizationName: "BookingFlow",
      createdAt: "2025-01-01T00:00:00Z",
    },
    token: "mock-jwt-token",
  };
}

export async function logout(): Promise<void> {
  await delay(300);
}
