// lib/getNavigationServer.ts

export type NavigationLink = {
  label: string;
  href: string;
  target?: '_self' | '_blank';
};

export async function getNavigationServer(): Promise<NavigationLink[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("⚠️ API URL mancante");
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/navigations?sort=ordine:asc`, {
      cache: 'no-store',
    });

    const data = await res.json();
    return data?.data?.map((item: any) => ({
      label: item.label,
      href: item.href,
      target: item.target || '_self',
    })) || [];
  } catch (error) {
    console.error("⚠️ Errore nel recupero della navigazione:", error);
    return [];
  }
}
