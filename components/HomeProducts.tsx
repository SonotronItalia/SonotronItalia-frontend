'use client';

import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const prodottiPrincipali: Product[] = [
  {
    id: 1,
    nome: "Sorazon Plus Studio",
    descrizione: "Dispositivo da studio professionale",
    prezzo: 0,
    immagine: "/plus.jpg",
  },
  {
    id: 2,
    nome: "Sorazon Speedy",
    descrizione: "Versione portatile compatta e veloce",
    prezzo: 0,
    immagine: "/speedy.jpg",
  },
];

export default function HomeProducts() {
  return (
    <motion.section
      className="h-full w-full flex flex-col items-center justify-center bg-white text-gray-900 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prodottiPrincipali.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
}
