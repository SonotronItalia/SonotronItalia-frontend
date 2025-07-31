import Image from "next/image";
import HeroSlideshow from "@/components/HeroSlideshow";
import InfoOverlay from "@/components/InfoOverlay";
import HomeProducts from "@/components/HomeProducts";
import MapSection from "@/components/MapSection";

export default function HomePage() {
  return (
    <div className="w-screen h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth">
      {/* Sezione 1: Slideshow */}
      <section className="snap-start h-screen w-screen relative">
        <HeroSlideshow />
      </section>

      {/* Sezione 2: Prodotti principali */}
      <section className="pt-24 snap-start h-screen w-screen">
        <HomeProducts />
      </section>

      {/* Sezione 3: Mappa */}
      <section className="snap-start h-screen w-screen">
        <MapSection />
      </section>
    </div>
  );
}

