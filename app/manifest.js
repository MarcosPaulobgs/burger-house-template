// Convenção do Next.js App Router: gera /manifest.webmanifest no build.
// Permite "Adicionar à tela inicial" no celular com ícone e cores da marca.
export default function manifest() {
  return {
    name: "Burger House",
    short_name: "Burger House",
    description:
      "Hambúrgueres, hot dogs e tapiocas artesanais em Sua Cidade - UF. Peça pelo site.",
    start_url: "/",
    display: "standalone",
    background_color: "#201c17",
    theme_color: "#ff8500",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
