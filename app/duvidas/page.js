import DuvidasClient from "./DuvidasClient";

const TITULO = "Dúvidas Frequentes | Burger House";
const DESCRICAO =
  "Horário de funcionamento, área de entrega, formas de pagamento e tudo o que você precisa saber antes de fazer seu pedido na Burger House.";

export const metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/duvidas",
  },
  twitter: {
    title: TITULO,
    description: DESCRICAO,
  },
};

export default function Page() {
  return <DuvidasClient />;
}
