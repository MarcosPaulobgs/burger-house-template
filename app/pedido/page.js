import PedidoClient from './PedidoClient';

const TITULO = "Fazer Pedido | Burger House";
const DESCRICAO =
  "Monte seu pedido navegando pelo cardápio completo: escolha hambúrgueres, combos, porções e bebidas, adicione ao carrinho, defina entrega ou retirada e finalize direto pelo WhatsApp.";

export const metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/pedido",
  },
  twitter: {
    title: TITULO,
    description: DESCRICAO,
  },
};

export default function Page() {
  return (
    <main>
      <PedidoClient />
    </main>
  );
}