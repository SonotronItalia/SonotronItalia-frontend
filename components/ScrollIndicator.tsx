'use client';

import { ChevronDown } from 'lucide-react';

export default function () {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce text-white opacity-80">
      <ChevronDown size={36} />
    </div>
  );
}
