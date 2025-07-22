// app/prodotti/page.tsx

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

const STRAPI_URL = "http://localhost:1337"; // Cambialo per deploy

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:1337/api/prodottos?populate=*", {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data.map((item: any) => ({
    id: item.id,
    nome: item.nome,
    descrizione: extractText(item.descrizione),
    prezzo: item.prezzo,
    immagine: item.immagine?.url
      ? `http://localhost:1337${item.immagine.url}`
      : undefined,
  }));
}

function extractText(richText: any): string {
  if (!Array.isArray(richText)) return "";
  return richText
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join(" ")
    )
    .join("\n");
}


export default async function ProdottiPage() {
  const prodotti = await getProducts();

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">I nostri prodotti</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prodotti.map((product) => (
          <ProductCard key={product.id} product={product} />
          
        ))}
       
      </div>
    </div>

  );
}

