const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${path}`, { headers });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function apiPatch<T>(
  path: string,
  body: unknown,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
