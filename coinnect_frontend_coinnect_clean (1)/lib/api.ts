export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('coinnect_token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers, cache: 'no-store' });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'API Fehler');
  }
  return response.json();
}

export const api = {
  login: (email: string, password: string) => request<{ token: string; user: unknown }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) => request<{ token: string; user: unknown }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  me: () => request<{ user: unknown }>('/auth/me'),
  home: () => request<any>('/home'),
  groups: () => request<any[]>('/groups'),
  createGroup: (name: string, description: string) => request<any>('/groups', { method: 'POST', body: JSON.stringify({ name, description }) }),
  activities: () => request<any[]>('/activities'),
  profile: () => request<any>('/profile'),
};
