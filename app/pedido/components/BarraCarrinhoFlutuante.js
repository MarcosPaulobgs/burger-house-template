"use client";

export default function BarraCarrinhoFlutuante({ quantidade, total, onAbrir }) {
  return (
    <button
      type="button"
      className={`barra-carrinho${quantidade > 0 ? " visivel" : ""}`}
      onClick={onAbrir}
      aria-hidden={quantidade === 0}
      tabIndex={quantidade > 0 ? 0 : -1}
    >
      <span className="esquerda">
        <span className="contagem">{quantidade}</span>
        <span>Ver carrinho</span>
      </span>
      <span className="direita">R$ {total.toFixed(2).replace(".", ",")}</span>
    </button>
  );
}
