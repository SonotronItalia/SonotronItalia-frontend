// components/ProductCard.tsx
'use client';

import Image from 'next/image';
import { Product } from '@/types/Product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const imageUrl = product.immagine?.medium ?? '/images/placeholder.jpg';

  return (
    <div className="rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white max-w-md w-full">
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={product.nome}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          placeholder="empty"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{product.nome}</h3>
        <p className="text-gray-700 mt-2">{product.descrizione}</p>
        <p className="mt-4 font-bold text-red-600">
          {product.prezzo > 0 ? `${product.prezzo.toFixed(2)} €` : 'Contattaci'}
        </p>
      </div>
    </div>
  );
}
