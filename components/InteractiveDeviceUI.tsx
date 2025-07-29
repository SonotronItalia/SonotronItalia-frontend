//components/InteractiveDeviceUI.tsx

import { useState } from "react";
import Image from "next/image";

const components = [
  { id: 1, label: "Monitor LCD", x: "58%", y: "25%" },
  { id: 2, label: "Manipolo trasduttore", x: "85%", y: "45%" },
  { id: 3, label: "Frequency knob", x: "65%", y: "63%" },
  { id: 4, label: "Interruttore accensione", x: "72%", y: "66%" },
  { id: 5, label: "Connettore cavo", x: "42%", y: "68%" },
  { id: 6, label: "Safety key", x: "34%", y: "72%" },
  { id: 7, label: "Maniglia", x: "52%", y: "78%" },
];

export default function InteractiveDevice() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
      <div className="relative">
        <Image
          src="/A_flat-style_digital_illustration_depicts_a_portab.png"
          alt="Sorazon Device"
          width={1000}
          height={600}
          className="rounded shadow-lg"
        />

        {components.map((comp) => (
          <div
            key={comp.id}
            className="absolute z-10 cursor-pointer"
            style={{ left: comp.x, top: comp.y, transform: "translate(-50%, -50%)" }}
            onClick={() => setActive(active === comp.id ? null : comp.id)}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          </div>
        ))}
      </div>

      {active !== null && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">{components.find((c) => c.id === active)?.label}</h3>
          <p className="text-sm text-gray-700">
            {(() => {
              switch (active) {
                case 1:
                  return "Schermo LCD che mostra i parametri di terapia.";
                case 2:
                  return "Trasduttore per l'emissione del trattamento.";
                case 3:
                  return "Manopola per regolare la frequenza.";
                case 4:
                  return "Tasto per l'accensione del dispositivo.";
                case 5:
                  return "Presa per collegare il manipolo al dispositivo.";
                case 6:
                  return "Chiave di sicurezza per l'attivazione dell'apparecchio.";
                case 7:
                  return "Maniglia per il trasporto del dispositivo.";
                default:
                  return "";
              }
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
