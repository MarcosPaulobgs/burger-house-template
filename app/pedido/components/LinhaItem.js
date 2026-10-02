"use client";

export default function LinhaItem({ item, qtdNoCarrinho, onClick }) {
  return (
    <div
      className="linha-item"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="linha-info">
        <h3>{item.nome}</h3>
        {item.desc && <p>{item.desc}</p>}
        <div className="linha-preco-linha">
          <span className="linha-preco">R$ {item.preco.toFixed(2).replace(".", ",")}</span>
          {qtdNoCarrinho > 0 && <span className="linha-qtd-chip">{qtdNoCarrinho}x no carrinho</span>}
        </div>
      </div>
      <div className="linha-foto">
        <span>📷</span>
        <span className="linha-foto-mais" aria-hidden="true">
          +
        </span>
      </div>
    </div>
  );
}
