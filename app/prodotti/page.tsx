// app/prodotti/page.tsx

import ProductCard from "@/components/ProductCard";
import { getProductsServer } from "@/lib/getProductsServer";

export default async function ProdottiPage() {
  const prodotti = await getProductsServer();

  return (
    <div className="p-4 pt-24">
      <h2 className="text-3xl text-center font-bold mb-6">I nostri prodotti</h2>
      <div className="flex flex-col items-center gap-6">
        {prodotti.map((product) => (
          <ProductCard
              key={product.id} // ✅ chiave unica richiesta da React
              product={product}
              fields={['nome', 'descrizione', 'immagine', 'peso', 'altezza', 'larghezza', 'profondita']} 
          />

        ))}
      </div>
    </div>
  );
}

