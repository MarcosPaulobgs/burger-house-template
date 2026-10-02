import Header from "./components/home/Header/Header";
import Hero from "./components/home/Hero/Hero";
import Destaques from "./components/home/Destaques/Destaques";
import ComoFunciona from "./components/home/ComoFunciona/ComoFunciona";
import SobreNos from "./components/home/SobreNos/SobreNos";
import Footer from "./components/home/Footer/Footer";

const TITULO = "Burger House | Peça agora";
const DESCRICAO =
  "A junção do artesanal e do tradicional de um jeito que você nunca viu. Hambúrgueres, hot dogs e tapiocas em Sua Cidade - UF. Peça pelo site e finalize no WhatsApp.";

const CLOUDINARY_OG_IMAGE =
  "/assets/img/opengraph-image.jpg";

export const metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/",
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
    title: TITULO,
    description: DESCRICAO,
    images: [CLOUDINARY_OG_IMAGE],
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Destaques />
      <ComoFunciona />
      <SobreNos />
      <Footer />
    </main>
  );
}
