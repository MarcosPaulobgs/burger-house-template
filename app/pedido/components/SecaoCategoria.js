"use client";

import LinhaItem from "./LinhaItem";

export default function SecaoCategoria({ categoria, itens, carrinho, onAbrirItem }) {
  return (
    <div className="secao-menu" id={`sec-${categoria.id}`}>
      <h2>{categoria.nome}</h2>
      <div className="linha-itens-grid">
        {itens.map((item) => (
          <LinhaItem
            key={item.id}
            item={item}
            qtdNoCarrinho={carrinho[item.id]?.qtd || 0}
            onClick={() => onAbrirItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
