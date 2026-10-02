// Convenção do Next.js App Router: este arquivo gera automaticamente
// a rota /robots.txt no build. Não precisa criar o .txt manualmente.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://seusite.com.br/sitemap.xml",
  };
}
