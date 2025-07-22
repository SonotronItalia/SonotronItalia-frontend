// types/Product.ts

export interface Product {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  immagine?: string; // URL già costruito
}
