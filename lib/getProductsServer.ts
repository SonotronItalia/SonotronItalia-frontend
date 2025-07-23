// lib/getProductsServer.ts

import { Product } from "@/types/Product";
import { getFullMediaUrl } from "./getFullMediaUrl";

export async function getProductsServer(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL mancante");

  const res = await fetch(`${apiUrl}/prodottos?populate=immagine`, {
    cache: 'no-store'
  });
  const data = await res.json();

  return data.data.map((item: any) => {
    const formati = item.immagine?.[0]?.formats ?? {};
    return {
      id: item.id,
      nome: item.nome,
      descrizione: Array.isArray(item.descrizione)
        ? item.descrizione[0]?.children[0]?.text ?? ''
        : '',
      prezzo: item.prezzo,
      immagine: {
        thumbnail: getFullMediaUrl(formati.thumbnail?.url),
        small: getFullMediaUrl(formati.small?.url),
        medium: getFullMediaUrl(formati.medium?.url),
      }
    };
  });
}
