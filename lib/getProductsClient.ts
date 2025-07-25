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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prodottos?populate=*`);
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
      const scheda = item.scheda_tecnica ?? {};

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
        peso: item.peso,
        altezza: item.altezza,
        larghezza: item.larghezza,
        profondita: item.profondita,
        scheda_tecnica: {
          Tensione_alimentazione: scheda.Tensione_alimentazione,
          Frequenza_nominale: scheda.Frequenza_nominale,
          Tensioni_interne: scheda.Tensioni_interne,
          Potenza_max_assorbita: scheda.Potenza_max_assorbita,
          Fusibili: scheda.Fusibili,
          Classe_di_sicurezza: scheda.Classe_di_sicurezza,
          Grado_di_protezione: scheda.Grado_di_protezione,
          Temperatura_di_funzionamento: scheda.Temperatura_di_funzionamento,
          Raffreddamento: scheda.Raffreddamento,
          Potenza_uscita_max: scheda.Potenza_uscita_max,
          Modalita_funzionamento: scheda.Modalita_funzionamento,
          Frequenza_lavoro: scheda.Frequenza_lavoro,
          Monitor: scheda.Monitor,
          Omologazione: scheda.Omologazione,
          Nome: scheda.Nome,
    }
      };
    });

    return prodottiFormattati;
  } catch (err) {
    console.error("❌ Errore fetch prodotti:", err);
    return [];
  }
}
