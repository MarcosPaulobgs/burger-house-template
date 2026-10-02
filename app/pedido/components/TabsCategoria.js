"use client";

import { useEffect, useRef } from "react";

export default function TabsCategoria({ categorias, ativa, onSelecionar }) {
  const tabsRef = useRef(null);

  useEffect(() => {
    const wrap = tabsRef.current;
    if (!wrap) return;
    const botaoAtivo = wrap.querySelector(".tab.ativa");
    if (botaoAtivo) {
      botaoAtivo.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }, [ativa]);

  return (
    <div className="tabs-wrap">
      <div className="tabs" ref={tabsRef}>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`tab${ativa === cat.id ? " ativa" : ""}`}
            onClick={() => onSelecionar(cat.id)}
          >
            {cat.nome}
          </button>
        ))}
      </div>
    </div>
  );
}