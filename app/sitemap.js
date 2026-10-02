// Convenção do Next.js App Router: este arquivo gera automaticamente
// a rota /sitemap.xml no build, listando as páginas públicas do site.
export default function sitemap() {
  const baseUrl = "https://seusite.com.br";
  const agora = new Date();

  return [
    {
      url: baseUrl,
      lastModified: agora,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pedido`,
      lastModified: agora,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/duvidas`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
