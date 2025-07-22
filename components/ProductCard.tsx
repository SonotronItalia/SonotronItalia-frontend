// components/ProductCard.tsx
import { Product } from "@/types/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      {product.immagine && (
        <picture>
          {/* TV & Grandi schermi */}
          {product.immagine.medium && (
            <source
              srcSet={product.immagine.medium}
              media="(min-width: 1280px)"
            />
          )}

          {/* Desktop & tablet */}
          {product.immagine.small && (
            <source
              srcSet={product.immagine.small}
              media="(min-width: 640px)"
            />
          )}

          {/* Mobile (fallback) */}
          <img
            src={product.immagine.thumbnail ?? ""}
            alt={product.nome}
            className="w-full h-48 object-cover rounded mb-2"
            loading="lazy"
          />
        </picture>
      )}

      <h3 className="text-xl font-semibold">{product.nome}</h3>
      <p className="text-gray-600">{product.descrizione}</p>
      <p className="text-blue-700 font-bold mt-2">€ {product.prezzo.toFixed(2)}</p>
    </div>
  );
}
