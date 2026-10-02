import { Bebas_Neue, Caveat, DM_Sans } from "next/font/google";
import "./styles/tokens.css";
import "./styles/base.css";

// Configuração das fontes com injeção de variáveis CSS globais
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--fonte-bebas",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--fonte-caveat",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--fonte-dmsans",
  display: "swap",
});

const DESCRICAO_PADRAO =
  "A junção do artesanal e do tradicional de um jeito que você nunca viu. Hambúrgueres, hot dogs e tapiocas em Sua Cidade - UF.";

const CLOUDINARY_OG_IMAGE =
  "/assets/img/opengraph-image.jpg";

const CLOUDINARY_ICON_URL =
  "/assets/img/logo.png";

// Configuração de Viewport separada
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Configurações de Metadados
export const metadata = {
  metadataBase: new URL("https://seusite.com.br"),
  title: {
    default: "Burger House",
    template: "%s",
  },
  description: DESCRICAO_PADRAO,
  icons: {
    icon: [
      { url: CLOUDINARY_ICON_URL, type: "image/png" },
    ],
    shortcut: [CLOUDINARY_ICON_URL],
    apple: [
      { url: CLOUDINARY_ICON_URL, sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seusite.com.br",
    siteName: "Burger House",
    title: "Burger House",
    description: DESCRICAO_PADRAO,
    images: [
      {
        url: CLOUDINARY_OG_IMAGE,
        secureUrl: CLOUDINARY_OG_IMAGE,
        width: 1200,
        height: 675,
        type: "image/jpeg",
        alt: "Burger House - Sabor que reúne momentos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Burger House",
    description: DESCRICAO_PADRAO,
    images: [CLOUDINARY_OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="pt-BR" 
      className={`${bebas.variable} ${caveat.variable} ${dmSans.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <div id="app-shell">{children}</div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
