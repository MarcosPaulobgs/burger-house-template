import Image from "next/image";
import "./styles/not-found.css";
import Logo from "./Logo";

export const metadata = {
  title: "Página não encontrada | Burger House",
  description: "A página que você tentou acessar não existe ou foi movida.",
};

export default function NotFound() {
  return (
    <div className="pagina-404">
      <a href="/" className="marca-404" aria-label="Ir para a página inicial">
        <Logo size={72} />
      </a>

      <div className="numero-404" aria-hidden="true">
        404
      </div>

      <Image
        src="/assets/img/mascote-404.webp"
        alt="Hambúrguer triste porque a página não foi encontrada"
        width={600}
        height={548}
        className="mascote-404"
        priority
      />

      <h1 className="titulo-404">
        Parece que esse lanche
        <br />
        <span>saiu do cardápio.</span>
      </h1>

      <p className="texto-404">
        A página que você procura não existe ou foi devorada. Que tal voltar
        pro início e{" "}
        <a href="/pedido" className="link-404">
          pedir algo incrível
        </a>
        ?
      </p>

      <div className="acoes-404">
        <a href="/" className="botao botao-primario">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20"
            height="20"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
          </svg>
          Voltar ao início
        </a>
        <a href="/pedido" className="botao botao-fantasma-404">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20"
            height="20"
          >
            <path d="M4 9h16" />
            <path d="M4 9c0-3.5 3.5-6 8-6s8 2.5 8 6" />
            <path d="M3.5 12h17c.3 2-1 6-2.5 7.5-1 1-2.5 1.5-4 1.5H10c-1.5 0-3-.5-4-1.5C4.5 18 3.2 14 3.5 12Z" />
          </svg>
          Fazer pedido
        </a>
      </div>
    </div>
  );
}
