/**
 * Restituisce l'URL completo di un file media servito da Strapi.
 * Usa la variabile d'ambiente NEXT_PUBLIC_MEDIA_URL
 * Esempio: "/uploads/image.jpg" → "http://localhost:1337/uploads/image.jpg"
 */
export function getFullMediaUrl(path?: string): string | undefined {
  if (!path) return undefined;

  const base = process.env.NEXT_PUBLIC_MEDIA_URL;
  if (!base) {
    console.warn("⚠️ NEXT_PUBLIC_MEDIA_URL non è definita!");
    return path; // fallback relativo
  }

  return `${base}${path}`;
}
