type Contatto = {
  id: number;
  indirizzo: string;
  telefono: string;
  email: string;
  map_link?: string;
};

async function getContatti(): Promise<Contatto | null> {
  const res = await fetch("http://localhost:1337/api/contattos", {
    cache: "no-store",
  });

  const json = await res.json();
  const item = json.data?.[0];

  if (!item) return null;

  return {
    id: item.id,
    indirizzo: item.indirizzo,
    telefono: item.telefono,
    email: item.email,
    map_link: item.map_link,
  };
}

export default async function ContattiPage() {
  const contatto = await getContatti();

  if (!contatto) {
    return <p className="text-center">Contatti non disponibili al momento.</p>;
  }

  return (
    <div className="max-w-3xl pt-24 pb-28 mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Contatti</h1>

      <div>
        <p className="font-semibold">Indirizzo:</p>
        <p>{contatto.indirizzo}</p>
      </div>

      <div>
        <p className="font-semibold">Telefono:</p>
        <p>{contatto.telefono}</p>
      </div>

      <div>
        <p className="font-semibold">Email:</p>
        <p>
          <a href={`mailto:${contatto.email}`} className="text-blue-600 underline">
            {contatto.email}
          </a>
        </p>
      </div>

      {contatto.map_link && (
        <div className="mt-6">
          <p className="font-semibold mb-2">Mappa:</p>
          <iframe
            src={contatto.map_link}
            className="w-full h-64 rounded"
            loading="lazy"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
