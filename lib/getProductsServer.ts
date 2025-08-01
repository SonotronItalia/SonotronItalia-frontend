// lib/getProductsServer.ts
import { Product } from "@/types/Product";
import { getFullMediaUrl } from "./getFullMediaUrl";

export async function getProductsServer(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL mancante");

  const res = await fetch(`${apiUrl}/prodottos?populate=*`, {
    cache: 'no-store'
  });
  const data = await res.json();

  return data.data.map((item: any) => {
    const scheda = item.scheda_tecnica ?? {};
    const features = item.features ?? [];
    const baseImg = item.immagine?.[0];
    const formati = baseImg?.formats ?? {};

    return {
      id: item.id,
      nome: item.nome,
      slug: item.slug,
      sottotitolo: item.sottotitolo,
      intro_features: item.intro_features,
      descrizione: item.descrizione,
      prezzo: item.prezzo,
      immagine: {
        thumbnail: getFullMediaUrl(formati.thumbnail?.url || baseImg?.url),
        small: getFullMediaUrl(formati.small?.url || baseImg?.url),
        medium: getFullMediaUrl(formati.medium?.url || baseImg?.url),
      },
      peso: item.peso,
      altezza: item.altezza,
      larghezza: item.larghezza,
      profondita: item.profondita,
      features: features.map((f: any) => ({
        title: f.title,
        description: f.description,
      })),
      composition_img: getFullMediaUrl(item.composition_img?.url),
      gallery: (item.gallery ?? []).map((img: any) =>
        getFullMediaUrl(img?.url)
      ),
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
      },
    };
  });
}
