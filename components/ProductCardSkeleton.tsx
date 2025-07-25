'use client';

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-lg shadow bg-gray-200 animate-pulse max-w-md w-full overflow-hidden">
      <div className="w-full h-64 bg-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-2/3" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-6 bg-gray-300 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}
