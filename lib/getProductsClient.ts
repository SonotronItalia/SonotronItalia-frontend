// lib/getProductsClient.ts
'use client';

import { Product } from "@/types/Product";
import { getFullMediaUrl } from "./getFullMediaUrl";

export async function getProductsClient(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error("❌ ERRORE: NEXT_PUBLIC_API_URL mancante.");
    return [];
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prodottos?populate=immagine`);
    if (!res.ok) {
      const error = await res.text();
      console.error("❌ Errore risposta:", res.status, error);
      return [];
    }

    const data = await res.json();
    if (!data || !Array.isArray(data.data)) {
      console.error("❌ Formato dati non valido:", data);
      return [];
    }

    const prodottiFormattati: Product[] = data.data.map((item: any) => {
      const formati = item.immagine?.[0]?.formats ?? {};

      return {
        id: item.id,
        nome: item.nome ?? "Senza nome",
        descrizione: Array.isArray(item.descrizione)
          ? item.descrizione[0]?.children[0]?.text ?? ''
          : '',
        prezzo: item.prezzo ?? 0,
        immagine: {
          thumbnail: getFullMediaUrl(formati.thumbnail?.url),
          small: getFullMediaUrl(formati.small?.url),
          medium: getFullMediaUrl(formati.medium?.url),
        },
      };
    });

    return prodottiFormattati;
  } catch (err) {
    console.error("❌ Errore fetch prodotti:", err);
    return [];
  }
}
