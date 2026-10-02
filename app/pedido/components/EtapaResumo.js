"use client";

import { PAGAMENTOS } from "../../data/cardapio";

// Ícones no lugar dos emojis — seguem o mesmo padrão do resto do site
// (currentColor + cor aplicada via CSS na classe .resumo-icone), pra
// funcionar tanto no fundo escuro quanto se o tema mudar no futuro.

const IconPagamento = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H6C4.34315 19 3 17.6569 3 16V8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
    <path d="M14 15L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconResponsavel = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M60.7 56.1c-.3-.8-19.1-12-19.1-12c-2.6-1.9-3-3.8-.8-4.9c1.8-.9 3.4-3.9 4.6-7.1c.2.1.4.1.7 0c5-1.5 5.1-11.5 1.7-9.7c3.1-27.2-34.5-27.2-31.4 0c-3.4-1.8-3.4 8.3 1.6 9.7c.2.1.5 0 .7 0c1.2 3.2 2.8 6.2 4.6 7.1c2.2 1.1 1.7 2.9-.9 5c-.9.7-13 7.5-16.4 9.8c-1.4.9-2.4 1.7-2.6 2.2C2.4 58.4 2 62 2 62h60s-.4-3.6-1.3-5.9" />
  </svg>
);

// Mesmo ícone usado em "Rua Exemplo, 000 - Centro" no rodapé (IconRua)
const IconEndereco = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <path d="M24 20C28.4183 20 32 16.4183 32 12C32 7.58172 28.4183 4 24 4C19.5817 4 16 7.58172 16 12C16 16.4183 19.5817 20 24 20Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    <path d="M24 20V38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 32H12L4 44H44L36 32H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Mesmo ícone do passo "01 — VISITE NOSSO ESPAÇO" em Como Funciona (IconLoja)
const IconComoReceber = ({ className }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M88.4,203C88.4,203.1,88.4,203.1,88.4,203c0.2,19.4,11.2,36.2,27.4,44.5v174c0,4.1,3.4,7.5,7.5,7.5h162.1h60.4h42.9 c4.1,0,7.5-3.4,7.5-7.5v-174c16.1-8.4,27.2-25.2,27.4-44.5c0,0,0,0,0,0c0-0.1,0-0.3,0-0.4c0,0,0-0.1,0-0.1c0-0.2,0-0.3,0-0.5 c0-0.1,0-0.2,0-0.3c0-0.1,0-0.3-0.1-0.4c0-0.1,0-0.2-0.1-0.4c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.3-0.1-0.4c0-0.1-0.1-0.2-0.1-0.3 c-0.1-0.2-0.1-0.3-0.2-0.4c0,0,0-0.1,0-0.1l-31.9-67.6v-25.7c0-12.8-10.4-23.3-23.3-23.3H144c-12.8,0-23.3,10.4-23.3,23.3v26.3 l-31.6,67c0,0,0,0.1,0,0.1c-0.1,0.1-0.1,0.3-0.2,0.4c0,0.1-0.1,0.2-0.1,0.3c0,0.1-0.1,0.3-0.1,0.4c0,0.1-0.1,0.2-0.1,0.3 c0,0.1,0,0.2-0.1,0.4c0,0.1,0,0.3-0.1,0.4c0,0.1,0,0.2,0,0.3c0,0.2,0,0.3,0,0.5c0,0,0,0.1,0,0.1C88.4,202.8,88.4,202.9,88.4,203z M133.3,141h55.5l-12.5,54.1h-68.6L133.3,141z M307.8,141l12.5,54.1h-56.8V141H307.8z M404.2,195.1h-68.6L323.2,141h55.5 L404.2,195.1z M326,220.1c-6.3,11.1-18.2,18.2-31.1,18.2c-13.2,0-25.3-7.4-31.5-19v-9.1h60.2L326,220.1z M188.3,210.1h60.2v9.1 c-6.1,11.6-18.3,19-31.5,19c-12.9,0-24.8-7.1-31.1-18.2L188.3,210.1z M248.5,195.1h-56.8l12.5-54.1h44.3V195.1z M104.2,210.1h68.6 l-1.9,8.4c-6,12-18.4,19.8-31.9,19.8C122,238.3,107.7,226.2,104.2,210.1z M292.9,414.1v-72.9c0-0.9,0.7-1.6,1.6-1.6h42.3 c0.9,0,1.6,0.7,1.6,1.6v72.9H292.9z M381.2,414.1h-27.9v-72.9c0-9.1-7.4-16.6-16.6-16.6h-42.3c-9.1,0-16.6,7.4-16.6,16.6v72.9 H130.8V252.6c2.7,0.4,5.4,0.7,8.3,0.7c15.2,0,29.5-6.9,39-18.4c9.5,11.4,23.8,18.4,39,18.4s29.5-6.9,39-18.4 c9.5,11.4,23.8,18.4,39,18.4s29.5-6.9,39-18.4c9.5,11.4,23.8,18.4,39,18.4c2.8,0,5.6-0.2,8.3-0.7V414.1z M372.9,238.3 c-13.5,0-25.9-7.7-31.9-19.8l-1.9-8.4h68.6C404.3,226.2,390,238.3,372.9,238.3z M135.8,106.2c0-4.5,3.7-8.3,8.3-8.3h223.7 c4.5,0,8.3,3.7,8.3,8.3V126H135.8V106.2z" />
    <path d="M237.8,272.6h-81.3c-4.1,0-7.5,3.4-7.5,7.5v65c0,4.1,3.4,7.5,7.5,7.5h81.3c4.1,0,7.5-3.4,7.5-7.5v-65 C245.3,275.9,241.9,272.6,237.8,272.6z M230.3,305.1h-25.7v-17.5h25.7V305.1z M189.6,287.6v17.5H164v-17.5H189.6z M164,320.1h25.7 v17.5H164V320.1z M204.6,337.6v-17.5h25.7v17.5H204.6z" />
  </svg>
);

// Ícone de mesa reservada, usado no "Tipo de pedido" quando é reserva
const IconMesa = ({ className }) => (
  <svg className={className} viewBox="0 0 491.413 491.413" fill="currentColor">
    <path d="M491.413,133.867c0-62.4-126.613-96.107-245.653-96.107S0,71.467,0,133.867c0,60.48,118.72,93.973,234.453,96v125.76 c-0.213,0.747-0.533,1.387-0.853,2.133c-4.587,0.32-8.533,3.52-9.6,8.107c-1.173,4.16-2.773,8.107-4.8,11.947 c-1.067,0.533-2.24,0.853-3.413,1.067c-12.373,1.6-30.08-17.707-36.693-27.307c-3.307-4.907-10.027-6.08-14.827-2.773 c-4.8,3.307-6.08,10.027-2.773,14.827c2.347,3.413,20.373,29.013,42.987,35.2c-13.013,14.08-34.027,28.373-67.84,33.6 c-5.867,0.853-9.813,6.293-8.96,12.16c0.747,5.227,5.333,9.067,10.56,9.067c0.533,0,1.067,0,1.6-0.107 c56.853-8.64,83.733-39.68,95.787-61.227c3.627-3.093,6.827-6.613,9.387-10.667c2.56,3.947,5.76,7.573,9.387,10.667 c12.16,21.547,39.04,52.587,95.893,61.227c0.533,0.107,1.067,0.107,1.6,0.107c5.867,0,10.667-4.8,10.667-10.667 c0-5.333-3.84-9.813-9.067-10.56c-33.92-5.227-55.04-19.52-67.947-33.6c22.613-6.293,40.747-31.893,43.093-35.307 c3.307-4.907,2.027-11.52-2.773-14.827c-4.907-3.307-11.52-2.027-14.827,2.773c-6.507,9.6-24.213,29.013-36.693,27.307 c-1.173-0.107-2.453-0.533-3.52-1.067c-1.92-3.84-3.52-7.787-4.693-11.947c-1.067-4.48-5.013-7.787-9.6-8 c-0.32-0.747-0.533-1.387-0.853-2.133l0.107-125.653C371.84,228.16,491.413,194.56,491.413,133.867z M248.32,208.747 c-1.707-0.747-3.733-0.747-5.44,0C112.747,208,22.187,169.067,22.187,134.08c0-35.307,91.947-74.667,224-74.667 s224,39.36,224,74.667C470.187,169.173,379.2,208.32,248.32,208.747z" />
  </svg>
);

export default function EtapaResumo({ itensCarrinho, estado, total }) {
  const pagamentoInfo = PAGAMENTOS.find((p) => p.id === estado.pagamento);

  return (
    <div>
      <p className="passo-sub">Revise tudo antes de enviar para o WhatsApp.</p>

      {itensCarrinho.length === 0 && <div className="resumo-vazio">Nenhum item selecionado ainda.</div>}

      {itensCarrinho.map(({ item, qtd, observacao }) => (
        <div className="resumo-item" key={item.id}>
          <span>
            {qtd}x {item.nome}
            {observacao && <small className="resumo-obs"> — obs: {observacao}</small>}
          </span>
          <span>R$ {(item.preco * qtd).toFixed(2).replace(".", ",")}</span>
        </div>
      ))}

      {estado.tipoPedido === "retirada" ? (
        <>
          <div className="resumo-item">
            <span className="resumo-label">
              <IconResponsavel className="resumo-icone" /> Retirar com
            </span>
            <span>{estado.nomeRetirada || "—"}</span>
          </div>
          <div className="resumo-item">
            <span className="resumo-label">
              <IconComoReceber className="resumo-icone" /> Como receber
            </span>
            <span>Retirar no local</span>
          </div>
        </>
      ) : estado.tipoPedido === "reserva" ? (
        <>
          <div className="resumo-item">
            <span className="resumo-label">
              <IconResponsavel className="resumo-icone" /> Reserva no nome de
            </span>
            <span>{estado.nomeReserva || "—"}</span>
          </div>
          <div className="resumo-item">
            <span className="resumo-label">
              <IconMesa className="resumo-icone" /> Tipo de pedido
            </span>
            <span>Reserva de mesa</span>
          </div>
        </>
      ) : (
        <>
          <div className="resumo-item">
            <span className="resumo-label">
              <IconResponsavel className="resumo-icone" /> Responsável
            </span>
            <span>{estado.nome || "—"}</span>
          </div>
          <div className="resumo-item">
            <span className="resumo-label">
              <IconEndereco className="resumo-icone" /> Endereço
            </span>
            <span style={{ textAlign: "right", maxWidth: "60%" }}>
              {estado.rua}, {estado.numero} — {estado.bairro}
              {estado.referencia ? ` (${estado.referencia})` : ""}
            </span>
          </div>
        </>
      )}

      <div className="resumo-item">
        <span className="resumo-label">
          <IconPagamento className="resumo-icone" /> Pagamento
        </span>
        <span>{pagamentoInfo?.nome || "—"}</span>
      </div>

      <div className="resumo-total">
        <span>Total</span>
        <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
      </div>
    </div>
  );
}