// types/Product.ts

export type Product = {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  immagine?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
  };
};

