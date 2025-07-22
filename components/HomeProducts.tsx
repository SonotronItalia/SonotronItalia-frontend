'use client';

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { getFullMediaUrl } from "@/lib/getFullMediaUrl";


export default function HomeProducts() {
  const [prodotti, setProdotti] = useState<Product[]>([]);

useEffect(() => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error("❌ ERRORE: NEXT_PUBLIC_API_URL mancante.");
    return;
  }

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/prodottos?populate=immagine`)
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.text();
        console.error("❌ Errore risposta:", res.status, error);
        return;
      }
      return res.json();
    })
    .then((data) => {
      if (!data || !Array.isArray(data.data)) {
        console.error("❌ Formato dati non valido:", data);
        return;
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

      setProdotti(prodottiFormattati);
    })
    .catch((err) => {
      console.error("❌ Errore fetch prodotti:", err);
    });
}, []);




  return (
    <motion.section
      className="h-full w-full flex flex-col items-center justify-center bg-white text-gray-900 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prodotti.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
}
