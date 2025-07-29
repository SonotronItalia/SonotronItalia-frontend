// components/ProductGallery.tsx
import Image from 'next/image';

type Props = {
  images: string[];
};

export default function ProductGallery({ images }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {images.map((src, i) => (
        <div key={i} className="relative aspect-video overflow-hidden rounded-lg shadow">
          <Image
            src={src}
            alt={`Product gallery image ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
