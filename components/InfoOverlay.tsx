export default function InfoOverlay() {
  return (
    <div className="absolute top-0 w-full h-screen bg-black/40 text-white flex items-end pb-12">
      <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Indicazioni</h3>
          <p>Come arrivare e contattare il centro</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Centri di riferimento</h3>
          <p>Dove trovare Sorazon in Italia</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Risultati</h3>
          <p>Dati clinici e storie di successo</p>
        </div>
      </div>
    </div>
  );
}
