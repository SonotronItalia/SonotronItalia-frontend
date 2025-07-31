// components/HomeProducts.tsx
'use client';

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { getProductsClient } from "@/lib/getProductsClient";

export default function HomeProducts() {
  const [prodotti, setProdotti] = useState<Product[]>([]);

  useEffect(() => {
    getProductsClient().then(setProdotti);
  }, []);

  return (
    <motion.section
      className="w-full flex flex-col items-center justify-center bg-white text-gray-900 px-4 py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6">Scopri i nostri prodotti</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {prodotti.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            fields={["nome", "descrizione", "immagine"]}
          />
        ))}
      </div>
    </motion.section>
  );
}
