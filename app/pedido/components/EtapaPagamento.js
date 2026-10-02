"use client";

import { PAGAMENTOS } from "../../data/cardapio";

export default function EtapaPagamento({ estado, onAlterarCampo }) {
  return (
    <div>
      <p className="passo-sub">Como você prefere pagar?</p>
      <div className="opcoes">
        {PAGAMENTOS.map((p) => (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            className={`opcao${estado.pagamento === p.id ? " selecionada" : ""}`}
            onClick={() => onAlterarCampo("pagamento", p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAlterarCampo("pagamento", p.id);
              }
            }}
          >
            <div className="txt">
              <strong>{p.nome}</strong>
              <small>{p.desc}</small>
            </div>
            <div className="marca-check">{estado.pagamento === p.id ? "✓" : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
