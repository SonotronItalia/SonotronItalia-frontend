/// app/prodotti/[slug]/page.tsx
import { getProductBySlugServer } from "@/lib/getProductBySlugServer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import RichTextRenderer from "@/components/RichTextRenderer";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sonotronitalia.com";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {slug} = await params;
  const product = await getProductBySlugServer(slug);
  if (!product) return {};

  return {
    title: `${product.nome} | Sonotron Italia`,
    description: typeof product.descrizione === "string"
      ? product.descrizione.slice(0, 160)
      : "Scopri il prodotto",
    alternates: {
      canonical: `${BASE_URL}/prodotti/${product.slug}`,
    },
    openGraph: {
      title: product.nome,
      description: typeof product.descrizione === "string" ? product.descrizione : "",
      images: [
        {
          url: product.immagine?.medium || `${BASE_URL}/images/placeholder.jpg`,
          alt: product.nome,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const {slug} = await params;
  const product = await getProductBySlugServer(slug);
  if (!product) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-28 py-10 space-y-16">

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.nome}</h1>

          {Array.isArray(product.sottotitolo) && (
            <h2 className="text-xl font-medium text-red-600">
              <RichTextRenderer content={product.sottotitolo} />
            </h2>
          )}

          {Array.isArray(product.descrizione) && (
            <div className="text-gray-700">
              <RichTextRenderer content={product.descrizione} />
            </div>
          )}

          {Array.isArray(product.intro_features) && (
            <div className="text-gray-600">
              <RichTextRenderer content={product.intro_features} />
            </div>
          )}
        </div>

        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={product.immagine?.medium || "/images/placeholder.jpg"}
            alt={product.nome}
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* GALLERY */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Galleria prodotto</h2>
        {product.gallery?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.gallery.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={img} alt={`Immagine ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={product.immagine?.small || "/images/placeholder.jpg"}
            alt={product.nome}
            width={900}
            height={600}
            className="rounded-md"
          />
        )}
      </section>

      {/* COMPOSIZIONE */}
      {product.composition_img && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Composizione</h2>
          <Image
            src={product.composition_img}
            alt="Composizione tecnica"
            width={1000}
            height={600}
            className="rounded-lg"
          />
        </section>
      )}

      {/* FEATURES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Funzionalità</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product.features?.map((feat, idx) => (
            <div key={idx} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="font-bold mb-1">{feat.title}</h3>
              <div className="text-sm text-gray-600">
                {Array.isArray(feat.description) && (
                  <RichTextRenderer content={feat.description} />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDA TECNICA */}
      {product.scheda_tecnica && (
        <details className="border-t pt-6 mt-6">
          <summary className="cursor-pointer text-xl font-semibold mb-4 text-blue-600">
            Scheda Tecnica
          </summary>
          <div className="space-y-2 mt-4 text-sm text-gray-700">
            {Object.entries(product.scheda_tecnica).map(([key, value]) =>
              value ? (
                <p key={key}>
                  <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
                </p>
              ) : null
            )}
          </div>
        </details>
      )}
    </div>
  );
}
