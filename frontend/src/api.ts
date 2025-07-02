export async function getApiDomain(): Promise<string> {
  const response = await fetch("/api-info.json");
  const data = await response.json();
  return data.domain;
}
