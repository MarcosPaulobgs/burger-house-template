"use client";

import { useEffect, useState } from "react";

export default function ModalItem({ item, qtdInicial, observacaoInicial, onFechar, onConfirmar }) {
  const [qtd, setQtd] = useState(qtdInicial > 0 ? qtdInicial : 1);
  const [observacao, setObservacao] = useState(observacaoInicial || "");

  // O controle do botão/gesto de voltar do celular é centralizado no
  // PedidoClient (pilha única de camadas + 1 listener de popstate).
  // Esse componente só chama onFechar — quem decide o que fazer com o
  // histórico é o pai.

  useEffect(() => {
    function aoTeclar(e) {
      if (e.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [onFechar]);

  const precoTotal = item.preco * qtd;

  function aoClicarOverlay(e) {
    if (e.target !== e.currentTarget) return;
    // No desktop (mouse de verdade), clique fora do quadrado não fecha —
    // evita fechar sem querer por causa de um clique/arraste que sobra
    // fora do painel. No touch continua fechando normalmente.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    onFechar();
  }

  return (
    <div
      className="overlay overlay-item aberto"
      role="dialog"
      aria-modal="true"
      aria-label={item.nome}
      onClick={aoClicarOverlay}
    >
      <div className="painel">
        <div className="painel-topo">
          <span />
          <button className="fechar-btn" onClick={onFechar} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="modal-foto">📷</div>
        <p className="modal-nome">{item.nome}</p>
        {item.desc && <p className="modal-desc">{item.desc}</p>}
        <div className="modal-preco-unit">R$ {item.preco.toFixed(2).replace(".", ",")}</div>

        <div className="stepper">
          <button type="button" onClick={() => setQtd((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade">
            −
          </button>
          <span>{qtd}</span>
          <button type="button" onClick={() => setQtd((q) => q + 1)} aria-label="Aumentar quantidade">
            +
          </button>
        </div>

        <label className="campo-label" htmlFor="modal-observacao">
          Observação (opcional)
        </label>
        <textarea
          id="modal-observacao"
          className="modal-observacao"
          placeholder="Ex: sem cebola, ponto da carne, tirar algum ingrediente..."
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          rows={2}
        />

        <button className="btn-add-carrinho" onClick={() => onConfirmar(qtd, observacao)}>
          <span>Adicionar</span>
          <span>R$ {precoTotal.toFixed(2).replace(".", ",")}</span>
        </button>
      </div>
    </div>
  );
}