export const formatSummary = (html: string | null): string | null => {
  if (!html) return null;

  const document = new DOMParser().parseFromString(html, 'text/html');
  const text = document.body.textContent?.replace(/\s+/g, ' ').trim();

  return text || null;
};
