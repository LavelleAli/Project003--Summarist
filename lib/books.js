const API = "https://us-central1-summaristt.cloudfunctions.net";
const CACHE_1H = { next: { revalidate: 3600 } };

// Returns the book, or null if the request failed or the id doesn't exist
// (the API answers an unknown id with an empty 200 response).
export async function getBook(id) {
  const res = await fetch(`${API}/getBook?id=${encodeURIComponent(id)}`, CACHE_1H);
  if (!res.ok) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Returns a list of books for a status ("selected", "recommended", "suggested"),
// or an empty list if the request failed.
export async function getBooks(status) {
  const res = await fetch(`${API}/getBooks?status=${status}`, CACHE_1H);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
