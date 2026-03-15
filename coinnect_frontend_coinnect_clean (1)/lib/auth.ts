export function saveAuth(token: string, user: unknown) {
  localStorage.setItem('coinnect_token', token);
  localStorage.setItem('coinnect_user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('coinnect_token');
  localStorage.removeItem('coinnect_user');
}

export function isAuthenticated() {
  return typeof window !== 'undefined' && Boolean(localStorage.getItem('coinnect_token'));
}
