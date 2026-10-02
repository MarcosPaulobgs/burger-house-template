"use client";

import { useState } from "react";
import "../styles/duvidas.css";
import Logo from "../Logo";
import { NUMERO_WHATSAPP } from "../data/cardapio";

const PERGUNTAS = [
  {
    pergunta: "Qual o horário de funcionamento?",
    resposta: "Funcionamos de terça a domingo, das 18h às 23h30. Segunda-feira é nosso dia de descanso.",
  },
  {
    pergunta: "Vocês entregam em qualquer bairro?",
    resposta:
      "Entregamos em Sua Cidade e região. Se tiver dúvida sobre o seu bairro, é só chamar no WhatsApp antes de fazer o pedido que a gente confirma rapidinho.",
  },
  {
    pergunta: "Quais as formas de pagamento?",
    resposta: "Aceitamos PIX, dinheiro e cartão de débito ou crédito na entrega/retirada.",
  },
  {
    pergunta: "Quanto tempo demora o pedido?",
    resposta:
      "Em dias normais, o preparo leva de 30 a 50 minutos, e a entrega pode variar de acordo com o seu bairro. Em dias de jogo ou promoção o tempo pode ser um pouco maior — a gente avisa por lá se estiver corrido.",
  },
  {
    pergunta: "Tem valor mínimo para entrega?",
    resposta: "Sim, o pedido mínimo para entrega é de R$ 25,00. Para retirada no local não tem valor mínimo.",
  },
  {
    pergunta: "Dá para tirar algum ingrediente do lanche?",
    resposta:
      "Dá sim! Depois de montar o pedido no site, é só avisar no campo de observações do WhatsApp o que você quer tirar ou trocar.",
  },
  {
    pergunta: "Como faço para acompanhar meu pedido?",
    resposta:
      "Depois de enviar o pedido pelo WhatsApp, nossa equipe confirma por lá e mantém você atualizado até a entrega ou retirada.",
  },
];

export default function DuvidasClient() {
  const [aberto, setAberto] = useState(-1);

  function alternar(i) {
    setAberto((atual) => (atual === i ? -1 : i));
  }

  return (
    <>
      <div className="topo topo-centralizado">
        <a href="/" className="topo-marca">
          <Logo size={32} />
          <div className="topo-marca-texto">
            <strong>Burger House</strong>
            <small>Burger House &amp; Hot dogs</small>
          </div>
        </a>
      </div>

      <div className="container-duvidas">
        <div className="duvidas-cabecalho">
          <span className="etiqueta">Dúvidas frequentes</span>
          <h1>Precisando de uma força?</h1>
          <p>Separamos as perguntas mais comuns antes de fazer o pedido. Não achou a sua? Chama no WhatsApp.</p>
        </div>

        <div>
          {PERGUNTAS.map((item, i) => (
            <div className={`acordeao-item${aberto === i ? " aberto" : ""}`} key={item.pergunta}>
              <button
                className="acordeao-pergunta"
                onClick={() => alternar(i)}
                aria-expanded={aberto === i}
              >
                <span>{item.pergunta}</span>
                <span className="acordeao-sinal" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="acordeao-resposta-wrap">
                <p className="acordeao-resposta">{item.resposta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="duvidas-cta">
          <p className="rabisco">Ainda com dúvida?</p>
          <div className="duvidas-cta-acoes">
            <a href="/" className="botao botao-fantasma-claro">
              ← Início
            </a>
            <a
              href={`https://wa.me/${NUMERO_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="botao botao-primario"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
