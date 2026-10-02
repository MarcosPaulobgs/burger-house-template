"use client";

import { TIPOS_PEDIDO } from "../../data/cardapio";

export default function EtapaEntrega({ estado, onAlterarCampo }) {
  return (
    <div>
      <p className="passo-sub">
        {estado.tipoPedido === "retirada"
          ? "A gente já deixa seu pedido pronto ou quase pronto pra quando você chegar."
          : estado.tipoPedido === "entrega"
          ? "Preencha os dados abaixo para a entrega."
          : estado.tipoPedido === "reserva"
          ? "Deixamos sua mesa reservada e o pedido pronto para quando você chegar."
          : "Escolha entre receber em casa, retirar direto no balcão ou reservar uma mesa."}
      </p>

      <div className="opcoes">
        {TIPOS_PEDIDO.map((t) => (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            className={`opcao${estado.tipoPedido === t.id ? " selecionada" : ""}`}
            onClick={() => onAlterarCampo("tipoPedido", t.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAlterarCampo("tipoPedido", t.id);
              }
            }}
          >
            <div className="txt">
              <strong>{t.nome}</strong>
              <small>{t.desc}</small>
            </div>
            <div className="marca-check">{estado.tipoPedido === t.id ? "✓" : ""}</div>
          </div>
        ))}
      </div>

      {estado.tipoPedido === "entrega" && (
        <div>
          <label className="campo-label">Nome do responsável</label>
          <input
            type="text"
            placeholder="Quem vai receber o pedido"
            value={estado.nome}
            onChange={(e) => onAlterarCampo("nome", e.target.value)}
          />

          <label className="campo-label">Rua</label>
          <input
            type="text"
            placeholder="Nome da rua"
            value={estado.rua}
            onChange={(e) => onAlterarCampo("rua", e.target.value)}
          />

          <label className="campo-label">Número</label>
          <input
            type="text"
            placeholder="Número da casa/apto"
            value={estado.numero}
            onChange={(e) => onAlterarCampo("numero", e.target.value)}
          />

          <label className="campo-label">Bairro</label>
          <input
            type="text"
            placeholder="Bairro"
            value={estado.bairro}
            onChange={(e) => onAlterarCampo("bairro", e.target.value)}
          />

          <label className="campo-label">Ponto de referência</label>
          <input
            type="text"
            placeholder="Opcional — ex: perto da praça, portão preto..."
            value={estado.referencia}
            onChange={(e) => onAlterarCampo("referencia", e.target.value)}
          />
        </div>
      )}

      {estado.tipoPedido === "retirada" && (
        <div>
          <label className="campo-label">Nome para retirada</label>
          <input
            type="text"
            placeholder="Nome de quem vai buscar o pedido"
            value={estado.nomeRetirada}
            onChange={(e) => onAlterarCampo("nomeRetirada", e.target.value)}
          />
        </div>
      )}

      {estado.tipoPedido === "reserva" && (
        <div>
          <label className="campo-label">Nome para a reserva</label>
          <input
            type="text"
            placeholder="Nome de quem vai reservar a mesa"
            value={estado.nomeReserva}
            onChange={(e) => onAlterarCampo("nomeReserva", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}