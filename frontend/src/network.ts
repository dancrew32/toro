export async function get(url: string) {
  const response = await window.fetch(url);
  return await response.json();
}
