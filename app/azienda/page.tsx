import Image from 'next/image';

type Azienda = {
  id: number;
  titolo: string;
  contenuto: string;
  immagine?: string;
};

async function getAzienda(): Promise<Azienda | null> {
  const res = await fetch('http://localhost:1337/api/aziendas?populate=*', {
    cache: 'no-store',
  });

  const json = await res.json();
  const item = json.data?.[0];

  if (!item) return null;

  return {
    id: item.id,
    titolo: item.titolo || '',
    contenuto: extractText(item.contenuto),
    immagine: item.immagine?.url
      ? `http://localhost:1337${item.immagine.url}`
      : undefined,
  };
}

function extractText(richText: any): string {
  if (!Array.isArray(richText)) return '';
  return richText
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join(' ')
    )
    .join('\n');
}

export default async function AziendaPage() {
  const azienda = await getAzienda();

  if (!azienda) {
    return <p className="text-center">Contenuto aziendale non disponibile.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{azienda.titolo}</h1>
      {azienda.immagine && (
        <img
          src={azienda.immagine}
          alt={azienda.titolo}
          className="w-full h-auto rounded mb-6"
        />
      )}
      <p className="text-gray-700 whitespace-pre-line">{azienda.contenuto}</p>
    </div>
  );
}

