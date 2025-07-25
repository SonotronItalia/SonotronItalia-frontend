// app/prodotti/[slug]/page.tsx

import { getProductsServer } from "@/lib/getProductsServer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sonotronitalia.com";

type Props = {
  params: {
    slug: string;
  };
};

// ✅ SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {slug} = await params;
  const prodotti = await getProductsServer();
  const product = prodotti.find((p) => p.slug === slug);

  if (!product) return {};

  const url = `${BASE_URL}/prodotti/${slug}`;
  const title = `${product.nome} | Sonotron Italia`;
  const description = product.descrizione?.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: product.immagine?.medium || `${BASE_URL}/images/placeholder.jpg`,
          alt: product.nome,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ Pagina Dettaglio
export default async function ProductDetailPage({ params }: Props) {
  const {slug} = await params;
  const prodotti = await getProductsServer();
  const product = prodotti.find((p) => p.slug === slug);

  if (!product) return notFound();

  const schemaProduct = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.nome,
    description: product.descrizione,
    image: product.immagine?.medium,
    sku: product.id.toString(),
    brand: {
      "@type": "Brand",
      name: "Sonotron Italia"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.prezzo,
      availability: "https://schema.org/InStock"
    },
    ...(product.larghezza && { width: product.larghezza }),
    ...(product.profondita && { depth: product.profondita }),
    ...(product.altezza && { height: product.altezza }),
    ...(product.scheda_tecnica?.Nome && { gtin13: product.scheda_tecnica?.Nome }),
  };

  function formatLabel(key: string): string {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{product.nome}</h1>

      {product.immagine?.medium && (
        <div className="relative w-full h-80 mb-8">
          <Image
            src={product.immagine.medium}
            alt={product.nome}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <p className="mb-4 text-gray-700">{product.descrizione}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-8">
        {product.peso && <p><strong>Peso:</strong> {product.peso}</p>}
        {product.altezza && <p><strong>Altezza:</strong> {product.altezza}</p>}
        {product.larghezza && <p><strong>Larghezza:</strong> {product.larghezza}</p>}
        {product.profondita && <p><strong>Profondità:</strong> {product.profondita}</p>}
      </div>

      {product.scheda_tecnica && (
        <div className="border-t pt-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4">Scheda Tecnica</h2>
          <div className="space-y-2">
            {Object.entries(product.scheda_tecnica).map(([key, value]) =>
              value ? (
                <p key={key}>
                  <strong>{formatLabel(key)}:</strong> {value}
                </p>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />
    </div>
  );
}
