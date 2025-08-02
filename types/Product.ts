// types/Product.ts

import { StrapiRichTextBlock } from "./StrapiRichText";

export type SchedaTecnica = {
  Tensione_alimentazione?: string;
  Frequenza_nominale?: string;
  Tensioni_interne?: string;
  Potenza_max_assorbita?: string;
  Fusibili?: string;
  Classe_di_sicurezza?: string;
  Grado_di_protezione?: string;
  Temperatura_di_funzionamento?: string;
  Raffreddamento?: string;
  Potenza_uscita_max?: string;
  Modalita_funzionamento?: string;
  Frequenza_lavoro?: string;
  Monitor?: string;
  Omologazione?: string;
  Nome?: string;
};

export type Product = {
  id: number;
  nome: string;
  slug: string;
  descrizione: StrapiRichTextBlock[] | string;
  sottotitolo?: StrapiRichTextBlock[] | string;
  intro_features?: StrapiRichTextBlock[] | string;
  prezzo: number;
  immagine?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
  };
  peso: string;
  altezza: string;
  larghezza: string;
  profondita: string;
  features?: {
    title: string;
    description: StrapiRichTextBlock[] | string;
  }[];
  composition_img?: string;
  gallery?: string[];
  scheda_tecnica?: SchedaTecnica;
};

export type ProductField = keyof Product;
