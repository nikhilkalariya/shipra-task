export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
