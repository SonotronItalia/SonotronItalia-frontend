import ProductCard from "@/components/ProductCard";
import { getProductsServer } from "@/lib/getProductsServer";
import Link from "next/link";

export default async function ProdottiPage() {
  const prodotti = await getProductsServer();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white text-gray-900 px-4 p-4 pt-24 pb-28">
      <h2 className="text-3xl text-center font-bold mb-6">I nostri dispositivi</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {prodotti.map((product) => (
          <Link
            key={product.id}
            href={`/prodotti/${product.slug}`}
            className="w-full flex justify-center"
          >
            <ProductCard
              product={product}
              fields={[
                "nome",
                "descrizione",
                "immagine",
                "peso",
                "altezza",
                "larghezza",
                "profondita",
              ]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
