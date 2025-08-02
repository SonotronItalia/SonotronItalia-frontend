// components/Footer.tsx
export default function Footer({ fixed = false }: { fixed?: boolean }) {
  return (
    <footer
      className={`${
        fixed
          ? 'fixed bottom-0 left-0 w-full z-50'
          : 'relative'
      } bg-gray-100 text-gray-600 border-t shadow-sm 
         text-xs md:text-sm lg:text-base
         py-3 px-4 text-center flex flex-col items-center justify-center`}
    >
      <p className="leading-snug">
        © {new Date().getFullYear()} Sonotron Italia
      </p>
      <p className="hidden sm:block">Tutti i diritti riservati</p>
    </footer>
  );
}
