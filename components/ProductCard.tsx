'use client';

import Image from 'next/image';
import { Product, ProductField } from '@/types/Product';
import { motion } from 'framer-motion';
import RichTextRenderer from './RichTextRenderer';

type Props = {
  product: Product;
  fields: ProductField[];
};

export default function ProductCard({ product, fields }: Props) {
  const imgUrl = product.immagine?.medium ?? '/images/placeholder.jpg';

  function formatLabel(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  return (
    <motion.div
      className="rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white max-w-md w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Immagine */}
      {fields.includes('immagine') && (
        <div className="relative w-full h-64">
          <Image
            src={imgUrl}
            alt={product.nome}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-2 text-gray-800">
        {/* Nome */}
        {fields.includes('nome') && (
          <h3 className="text-xl font-bold">{product.nome}</h3>
        )}

        {/* Descrizione (rich text) */}
        {fields.includes('descrizione') && product.descrizione && Array.isArray(product.descrizione) && (
  <RichTextRenderer content={product.descrizione} />
)}


        {/* Prezzo */}
        {fields.includes('prezzo') && (
          <p className="font-bold text-red-600">
            {product.prezzo && product.prezzo > 0
              ? `${product.prezzo.toFixed(2)} €`
              : 'Contattaci'}
          </p>
        )}

        {/* Peso */}
        {fields.includes('peso') && product.peso && (
          <p className="text-sm italic text-gray-500">
            Peso: {product.peso}
          </p>
        )}

        {/* Altezza */}
        {fields.includes('altezza') && product.altezza && (
          <p className="text-sm italic text-gray-500">
            Altezza: {product.altezza}
          </p>
        )}

        {/* Larghezza */}
        {fields.includes('larghezza') && product.larghezza && (
          <p className="text-sm italic text-gray-500">
            Larghezza: {product.larghezza}
          </p>
        )}

        {/* Profondità */}
        {fields.includes('profondita') && product.profondita && (
          <p className="text-sm italic text-gray-500">
            Profondità: {product.profondita}
          </p>
        )}
      </div>

      {/* Scheda tecnica */}
      {fields.includes('scheda_tecnica') && product.scheda_tecnica && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-1">
          {Object.entries(product.scheda_tecnica).map(([key, value]) => (
            value ? (
              <p key={key}>
                <span className="font-semibold">{formatLabel(key)}:</span> {value}
              </p>
            ) : null
          ))}
        </div>
      )}
    </motion.div>
  );
}
