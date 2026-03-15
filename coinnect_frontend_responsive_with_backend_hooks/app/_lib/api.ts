import { Activity, Group, Overview, User } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unbekannter Fehler" }));
    throw new Error(error.message || "Anfrage fehlgeschlagen");
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string) {
  return request<{ token: string; user: User }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(name: string, email: string, password: string) {
  return request<{ token: string; user: User }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function fetchOverview(): Promise<Overview> {
  return request<Overview>("/api/app/overview");
}

export async function fetchGroups(): Promise<Group[]> {
  return request<Group[]>("/api/groups");
}

export async function fetchHistory(): Promise<Activity[]> {
  return request<Activity[]>("/api/history");
}

export async function fetchProfile(): Promise<{ user: User; quickActions: Overview["quickActions"] }> {
  return request<{ user: User; quickActions: Overview["quickActions"] }>("/api/profile");
}
