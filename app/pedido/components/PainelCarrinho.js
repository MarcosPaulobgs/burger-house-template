"use client";

import { useEffect } from "react";
import EtapaEntrega from "./EtapaEntrega";
import EtapaPagamento from "./EtapaPagamento";
import EtapaResumo from "./EtapaResumo";
import IconeLixeira from "./IconeLixeira";

const TITULOS_ETAPA = {
  carrinho: "Seu carrinho",
  entrega: "Entrega, retirada ou reserva",
  pagamento: "Forma de pagamento",
  resumo: "Confira seu pedido",
};

const TEXTOS_AVANCAR = {
  carrinho: "Continuar",
  entrega: "Continuar",
  pagamento: "Continuar",
  resumo: "Enviar pedido no WhatsApp",
};

export default function PainelCarrinho({
  etapa,
  itensCarrinho,
  total,
  estado,
  onAlterarCampo,
  onAlterarQtd,
  onRemoverItem,
  onEditarItem,
  onVoltar,
  onAvancar,
  onFechar,
  erro,
}) {
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

  const carrinhoVazio = itensCarrinho.length === 0;

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
      className="overlay overlay-carrinho aberto"
      role="dialog"
      aria-modal="true"
      aria-label={TITULOS_ETAPA[etapa]}
      onClick={aoClicarOverlay}
    >
      <div className="painel">
        <div className="painel-topo">
          <p className="rotulo-secao-carrinho">{TITULOS_ETAPA[etapa]}</p>
          <button className="fechar-btn" onClick={onFechar} aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        {etapa === "carrinho" && (
          <div>
            {carrinhoVazio && <div className="aviso-vazio">Seu carrinho está vazio. Toque em um item do menu para adicionar.</div>}

            {itensCarrinho.map(({ item, qtd, observacao }) => (
              <div className="carrinho-item" key={item.id}>
                <div className="carrinho-item-info" role="button" tabIndex={0} onClick={() => onEditarItem(item)}>
                  <span className="nome-mini">{item.nome}</span>
                  {observacao && <small className="resumo-obs">obs: {observacao}</small>}
                </div>
                <div className="mini-contador">
                  <button type="button" onClick={() => onAlterarQtd(item.id, -1)} aria-label={`Diminuir ${item.nome}`}>
                    −
                  </button>
                  <span>{qtd}</span>
                  <button type="button" onClick={() => onAlterarQtd(item.id, 1)} aria-label={`Aumentar ${item.nome}`}>
                    +
                  </button>
                </div>
                <span className="preco-mini">R$ {(item.preco * qtd).toFixed(2).replace(".", ",")}</span>
                <button className="remover-item-btn" onClick={() => onRemoverItem(item.id)} aria-label={`Remover ${item.nome}`}>
                  <IconeLixeira />
                </button>
              </div>
            ))}

            {!carrinhoVazio && (
              <div className="carrinho-total">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            )}
          </div>
        )}

        {etapa === "entrega" && <EtapaEntrega estado={estado} onAlterarCampo={onAlterarCampo} />}
        {etapa === "pagamento" && <EtapaPagamento estado={estado} onAlterarCampo={onAlterarCampo} />}
        {etapa === "resumo" && <EtapaResumo itensCarrinho={itensCarrinho} estado={estado} total={total} />}

        {erro && <div className="aviso-validacao">⚠️ {erro}</div>}

        <div className="painel-nav">
          <button className="btn btn-voltar" onClick={onVoltar}>
            {etapa === "carrinho" ? "Continuar comprando" : "Voltar"}
          </button>
          {!carrinhoVazio && (
            <button
              className={`btn btn-avancar${etapa === "resumo" ? " btn-finalizar" : ""}`}
              onClick={onAvancar}
            >
              {TEXTOS_AVANCAR[etapa]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}