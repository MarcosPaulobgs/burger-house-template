"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../styles/pedido.css";
import Logo from "../Logo";
import { CATEGORIAS, CARDAPIO, PAGAMENTOS, NUMERO_WHATSAPP } from "../data/cardapio";
import TabsCategoria from "./components/TabsCategoria";
import SecaoCategoria from "./components/SecaoCategoria";
import ModalItem from "./components/ModalItem";
import BarraCarrinhoFlutuante from "./components/BarraCarrinhoFlutuante";
import PainelCarrinho from "./components/PainelCarrinho";
import useDeliveryStatus from "../hooks/useDeliveryStatus";

const CHAVE_PROGRESSO = "pedido_burgerhouse_em_andamento";
const CHAVE_ANCORA_PEDIDO = "pedido_burgerhouse_ancora_voltar";

const EMOJI_CATEGORIA = {
  "hamburgueres-artesanais": "🍔",
  "hamburgueres-tradicionais": "🍔",
  smashs: "🥪",
  combos: "🎉",
  batatas: "🍟",
  porcoes: "🍗",
  cervejas: "🍺",
  bebidas: "🥤",
};

const ORDEM_ETAPAS = ["carrinho", "entrega", "pagamento", "resumo"];

const estadoCheckoutInicial = {
  tipoPedido: null,
  nome: "",
  rua: "",
  numero: "",
  bairro: "",
  referencia: "",
  nomeRetirada: "",
  nomeReserva: "",
  pagamento: null,
};

function calcularTotal(carrinho) {
  let total = 0;
  Object.entries(carrinho).forEach(([id, entrada]) => {
    const item = CARDAPIO.find((i) => i.id === id);
    if (item) total += item.preco * entrada.qtd;
  });
  return total;
}

function montarItensCarrinho(carrinho) {
  return Object.entries(carrinho)
    .map(([id, entrada]) => {
      const item = CARDAPIO.find((i) => i.id === id);
      if (!item) return null;
      return { item, qtd: entrada.qtd, observacao: entrada.observacao || "" };
    })
    .filter(Boolean);
}

// ---------- Trava de scroll do fundo compatível com iOS ----------
// `overflow: hidden` no body NÃO trava o scroll de verdade no Safari/iOS
// (o conteúdo ainda "arrasta" com o bounce). A técnica que funciona de
// fato é fixar o body na posição atual e devolver o scroll certinho
// quando destrava — por isso guardamos a posição em vez de só mexer no
// overflow.
function travarScrollFundo() {
  const scrollY = window.scrollY || window.pageYOffset || 0;
  document.body.dataset.scrollYTravado = String(scrollY);
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function destravarScrollFundo() {
  const scrollY = Number(document.body.dataset.scrollYTravado || "0");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  delete document.body.dataset.scrollYTravado;
  // behavior: "instant" pra ignorar o scroll-behavior: smooth global do
  // <html> — sem isso, toda vez que o modal fecha (ex.: depois de
  // adicionar um item ao carrinho) a página fica visivelmente "rolando"
  // de volta até a posição onde você estava, em vez de voltar na hora.
  window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
}

export default function PedidoClient() {
  const router = useRouter();
  const deliveryAberto = useDeliveryStatus();
  const [carrinho, setCarrinho] = useState({});
  const [estadoCheckout, setEstadoCheckout] = useState(estadoCheckoutInicial);
  const [categoriaAtiva, setCategoriaAtiva] = useState(CATEGORIAS[0]?.id);
  const [modalItemAtivo, setModalItemAtivo] = useState(null);
  const [painelAberto, setPainelAberto] = useState(false);
  const [etapaPainel, setEtapaPainel] = useState("carrinho");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState({ ativo: false, link: "" });
  const restauradoRef = useRef(false);

  // ---------- Pilha central de "camadas" abertas (painel / item) ----------
  // Substitui o antigo useGaveta.js. Em vez de cada gaveta controlar seu
  // próprio histórico (o que exigia setTimeout + contador de geração pra
  // sobreviver ao Strict Mode e ainda assim falhava em dispositivo real),
  // existe UM único lugar que sabe o que está aberto e UM único listener
  // de popstate. Cada abertura empilha exatamente 1 entrada de histórico;
  // fechar pela UI (X, clique fora, Esc, confirmar) sempre passa por
  // history.back() — quem efetivamente fecha o estado é sempre o
  // popstate, nunca a UI diretamente. Isso elimina a corrida entre "UI
  // fechou" e "voltar fechou" que causava o bug.
  const [pilha, setPilha] = useState([]); // ex.: ["painel"], ["painel", "item"], ["item"]
  const pilhaRef = useRef([]);
  useEffect(() => {
    pilhaRef.current = pilha;
  }, [pilha]);

  // Espelha etapaPainel num ref pro listener de popstate (definido uma
  // única vez, mais abaixo) sempre enxergar a etapa mais recente sem
  // precisar recriar o listener a cada troca de etapa.
  const etapaPainelRef = useRef(etapaPainel);
  useEffect(() => {
    etapaPainelRef.current = etapaPainel;
  }, [etapaPainel]);
  // Atualiza ref + state juntos, na mesma chamada síncrona. Depender só do
  // useEffect acima pra manter o ref em dia cria uma janela onde o ref
  // ainda está com o valor antigo (até o React commitar e o efeito
  // rodar); dois toques físicos de voltar em sequência rápida — sem
  // nenhum toque na tela entre eles, que é o que dá tempo do efeito
  // rodar — podem cair nessa janela e ler a etapa errada.
  function mudarEtapaPainel(novaEtapa) {
    etapaPainelRef.current = novaEtapa;
    setEtapaPainel(novaEtapa);
  }

  useEffect(() => {
    function aoVoltar(evento) {
      if (pilhaRef.current.length === 0) {
        // Nenhuma gaveta/modal nosso pra fechar. Se essa entrada é a "âncora"
        // de segurança (ver efeito abaixo), o usuário chegou direto nessa
        // página e não existe pra onde voltar de verdade — sem isso, o app
        // fecharia inteiro no toque seguinte. Manda pra Home.
        // Importante: a flag NÃO vive em history.state — o App Router do
        // Next também escreve nessa mesma entrada de histórico (cache de
        // navegação/scroll) e pode sobrescrever o que a gente coloca lá
        // entre o mount e o toque físico de voltar, fazendo a checagem
        // falhar silenciosamente. Por isso guardamos em sessionStorage,
        // que é só nosso.
        let temAncora = false;
        try {
          temAncora = sessionStorage.getItem(CHAVE_ANCORA_PEDIDO) === "1";
        } catch (e) {
          // sessionStorage indisponível (modo privado/restrito) — sem rede
          // de segurança nesse caso, mas não quebra o resto do app.
        }
        if (temAncora) {
          try {
            sessionStorage.removeItem(CHAVE_ANCORA_PEDIDO);
          } catch (e) {}
          router.push("/");
        }
        return;
      }
      const topo = pilhaRef.current[pilhaRef.current.length - 1];

      // Ainda dentro do painel (entrega/pagamento/resumo/carrinho): a
      // etapa a mostrar vem DIRETO do state da entrada em que acabamos de
      // cair (evento.state.etapaPedido), nunca de um índice recalculado
      // a partir de algo que o React guardou antes. Cada avanço de etapa
      // (avancarEtapa) grava uma entrada de histórico própria com a etapa
      // certa — então mesmo que o usuário dê vários toques físicos de
      // voltar bem colados, o navegador processa as entradas reais em
      // ordem e cada uma já chega com a informação certa, sem depender
      // de o JS "compensar" a tempo entre um toque e outro.
      if (topo === "painel" && evento.state?.camadaPedido === "painel") {
        mudarEtapaPainel(evento.state.etapaPedido || "carrinho");
        setErro("");
        return;
      }

      setPilha((p) => p.slice(0, -1));
      if (topo === "item") {
        setModalItemAtivo(null);
      } else if (topo === "painel") {
        setPainelAberto(false);
        mudarEtapaPainel("carrinho");
        setErro("");
      }
    }
    window.addEventListener("popstate", aoVoltar);
    return () => window.removeEventListener("popstate", aoVoltar);
  }, [router]);

  // ---------- Rede de segurança: garante pra onde voltar ----------
  // Quando /pedido é a PRIMEIRA entrada da aba (link direto do WhatsApp/
  // Instagram, atalho do PWA, ou F5 na própria página), não existe Home
  // antes dela no histórico. Duplicamos a entrada atual (1 replace + 1
  // push) só nesse cenário, marcando as duas como "âncora": o primeiro
  // toque no botão físico cai numa entrada nossa (ver aoVoltar acima) em
  // vez de sair do site direto.
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAVE_ANCORA_PEDIDO, "1");
    } catch (e) {}
    window.history.replaceState(window.history.state, "");
    window.history.pushState(window.history.state, "");
  }, []);

  function empilharCamada(tipo) {
    setPilha((p) => [...p, tipo]);
    // Preserva o state que o App Router do Next já guarda na entrada
    // atual (senão o Next perde a própria árvore de navegação e o
    // popstate de volta passa a exigir vários toques). Quando é o
    // painel, já grava a etapa inicial ("carrinho") — assim toda
    // entrada de histórico do painel, do começo ao fim, sempre tem uma
    // etapaPedido explícita, sem casos especiais.
    const extra = tipo === "painel" ? { etapaPedido: "carrinho" } : {};
    window.history.pushState({ ...window.history.state, camadaPedido: tipo, ...extra }, "");
  }

  // Fecha a camada do topo pela UI (X, clique fora do overlay, Esc,
  // "Adicionar", "Continuar comprando"...). Nunca muda o estado
  // diretamente — só consome a entrada de histórico; quem fecha de fato
  // é o listener de popstate acima, sempre.
  function fecharCamadaTopo() {
    if (pilhaRef.current.length === 0) return;
    window.history.back();
  }

  // Trava/destrava o scroll do fundo assim que existe pelo menos uma
  // camada aberta — independente de qual (painel e item podem se
  // empilhar, mas o scroll só precisa ser travado/destravado uma vez).
  const scrollTravadoRef = useRef(false);
  useEffect(() => {
    const temCamadaAberta = pilha.length > 0;
    if (temCamadaAberta && !scrollTravadoRef.current) {
      travarScrollFundo();
      scrollTravadoRef.current = true;
    } else if (!temCamadaAberta && scrollTravadoRef.current) {
      destravarScrollFundo();
      scrollTravadoRef.current = false;
    }
  }, [pilha.length]);

  // O scroll-snap global do site (tokens.css, pensado pra home) briga com
  // o IntersectionObserver que ativa a tab de categoria certa: o
  // navegador tenta "encaixar" a rolagem enquanto o observer tenta medir
  // a seção visível, e no celular isso gera trancos/pulos no scroll.
  // Desliga só enquanto a página de pedido está montada.
  useEffect(() => {
    const original = document.documentElement.style.scrollSnapType;
    document.documentElement.style.scrollSnapType = "none";
    return () => {
      document.documentElement.style.scrollSnapType = original;
    };
  }, []);

  // ---------- Restaura progresso salvo (só no cliente) ----------
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_PROGRESSO);
      if (salvo) {
        const dados = JSON.parse(salvo);
        if (dados.carrinho) setCarrinho(dados.carrinho);
        if (dados.estadoCheckout) {
          // tipoPedido fica de fora de propósito: sem isso, a escolha de
          // "Entrega" ou "Retirar no local" feita numa sessão anterior
          // voltava marcada sozinha da próxima vez, mesmo sem o cliente
          // ter escolhido nada ainda nesta visita.
          const { tipoPedido, ...restoDoEstado } = dados.estadoCheckout;
          setEstadoCheckout((prev) => ({ ...prev, ...restoDoEstado }));
        }
      }
    } catch (e) {
      localStorage.removeItem(CHAVE_PROGRESSO);
    }
    restauradoRef.current = true;
  }, []);

  // Grava no localStorage na hora exata em que o carrinho/checkout muda,
  // em vez de esperar um useEffect assíncrono rodar depois. Isso evita
  // que uma navegação (ex.: fechar a gaveta do item) aconteça antes do
  // progresso ter sido salvo de fato.
  function persistirProgresso(carrinhoAtual, estadoAtual) {
    if (!restauradoRef.current) return;
    try {
      localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify({ carrinho: carrinhoAtual, estadoCheckout: estadoAtual }));
    } catch (e) {
      // localStorage indisponível (modo privado, quota cheia etc.) — ignora
    }
  }

  // ---------- Abre o WhatsApp automaticamente após mostrar a tela de sucesso ----------
  useEffect(() => {
    if (!sucesso.ativo) return;
    const id = setTimeout(() => {
      window.open(sucesso.link, "_blank");
    }, 1800);
    return () => clearTimeout(id);
  }, [sucesso.ativo, sucesso.link]);

  // ---------- Mede a altura real da barra de abas (sticky) ----------
  // Um valor fixo em CSS para compensar a barra fixa no topo ficava
  // errado ora no mobile, ora no desktop (a barra tem tamanhos
  // diferentes nos dois). Medindo de verdade e guardando numa variável
  // CSS, tanto o "pular para a seção" quanto o "detector de seção
  // ativa" abaixo passam a usar sempre o valor certo, em qualquer tela.
  const [alturaBarraTabs, setAlturaBarraTabs] = useState(70);

  useEffect(() => {
    const barra = document.querySelector(".tabs-wrap");
    if (!barra) return;

    function medir() {
      const altura = Math.ceil(barra.getBoundingClientRect().height);
      setAlturaBarraTabs(altura);
      document.documentElement.style.setProperty("--altura-barra-tabs", `${altura}px`);
    }

    medir();
    const observadorResize = new ResizeObserver(medir);
    observadorResize.observe(barra);
    return () => observadorResize.disconnect();
  }, []);

  // ---------- Scroll-spy das tabs de categoria ----------
  // ignorarScrollSpyRef trava a detecção automática por um instante
  // quando o usuário CLICA numa aba: como o scroll até a seção é suave
  // (leva ~400-600ms), sem essa trava o observer via de seções no meio
  // do caminho e a aba ativa "pisca" errada até o scroll terminar.
  const ignorarScrollSpyRef = useRef(false);

  // A abordagem por IntersectionObserver (comparar "quem já passou do
  // topo") falava mal quando havia várias seções pequenas na tela ao
  // mesmo tempo (por isso "combos" era pulada e "batatas"/"porções", os
  // últimos, nunca ativavam no fim da página). A solução agora é bem
  // mais direta: existe uma LINHA imaginária fixa a 45% da altura da
  // tela (um pouco acima do centro) e a categoria ativa é sempre a
  // seção que está cobrindo essa linha no momento — não importa se ela
  // é curta ou se cabem várias seções na tela ao mesmo tempo.
  useEffect(() => {
    const LINHA_PORCENTAGEM = 0.45;

    function detectarSecaoNaLinha() {
      if (ignorarScrollSpyRef.current) return;

      const secoes = Array.from(document.querySelectorAll(".secao-menu"));
      if (secoes.length === 0) return;

      const linhaY = window.innerHeight * LINHA_PORCENTAGEM;

      // Fim da página: garante que a última categoria (ex.: "porções")
      // sempre acende, mesmo que ela seja curta demais pra cobrir a
      // linha dos 45% quando o scroll chega ao fundo.
      const noFimDaPagina =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (noFimDaPagina) {
        setCategoriaAtiva(secoes[secoes.length - 1].id.replace("sec-", ""));
        return;
      }

      // Topo da página: antes da primeira seção alcançar a linha, ela
      // já é a ativa (evita ficar sem nenhuma aba marcada no início).
      const primeiraTopo = secoes[0].getBoundingClientRect().top;
      if (primeiraTopo > linhaY) {
        setCategoriaAtiva(secoes[0].id.replace("sec-", ""));
        return;
      }

      // Caso normal: acha a seção cujo intervalo [topo, fundo] contém
      // a linha. Como as seções são sequenciais e não se sobrepõem,
      // só uma qualifica — sem ambiguidade mesmo com seções curtas.
      for (const secao of secoes) {
        const rect = secao.getBoundingClientRect();
        if (rect.top <= linhaY && rect.bottom > linhaY) {
          setCategoriaAtiva(secao.id.replace("sec-", ""));
          return;
        }
      }

      // Segurança: se a linha caiu num "vão" entre seções (não deveria
      // acontecer, mas por via das dúvidas), fica com a última seção
      // cujo topo já passou da linha.
      let ultimaPassada = secoes[0];
      secoes.forEach((secao) => {
        if (secao.getBoundingClientRect().top <= linhaY) ultimaPassada = secao;
      });
      setCategoriaAtiva(ultimaPassada.id.replace("sec-", ""));
    }

    let quadroAgendado = null;
    function aoRolar() {
      if (quadroAgendado) return;
      quadroAgendado = requestAnimationFrame(() => {
        quadroAgendado = null;
        detectarSecaoNaLinha();
      });
    }

    detectarSecaoNaLinha();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (quadroAgendado) cancelAnimationFrame(quadroAgendado);
    };
  }, []);

  function irParaCategoria(id) {
    const el = document.getElementById(`sec-${id}`);
    if (!el) return;
    ignorarScrollSpyRef.current = true;
    setCategoriaAtiva(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Solta a trava quando o navegador avisa que o scroll suave acabou
    // (Safari ainda não suporta "scrollend" em todas as versões, por
    // isso o setTimeout abaixo funciona como rede de segurança).
    let liberado = false;
    const liberar = () => {
      if (liberado) return;
      liberado = true;
      ignorarScrollSpyRef.current = false;
      window.removeEventListener("scrollend", liberar);
    };
    window.addEventListener("scrollend", liberar, { once: true });
    setTimeout(liberar, 800);
  }

  function abrirModalItem(item) {
    setModalItemAtivo(item);
    empilharCamada("item");
  }

  function confirmarModalItem(qtd, observacao) {
    setCarrinho((prev) => {
      const novo = { ...prev, [modalItemAtivo.id]: { qtd, observacao } };
      persistirProgresso(novo, estadoCheckout);
      return novo;
    });
    fecharCamadaTopo();
  }

  function alterarQtdCarrinho(id, delta) {
    setCarrinho((prev) => {
      const atual = prev[id];
      if (!atual) return prev;
      const novaQtd = Math.max(0, atual.qtd + delta);
      let novo;
      if (novaQtd === 0) {
        const copia = { ...prev };
        delete copia[id];
        novo = copia;
      } else {
        novo = { ...prev, [id]: { ...atual, qtd: novaQtd } };
      }
      persistirProgresso(novo, estadoCheckout);
      return novo;
    });
  }

  function removerItemCarrinho(id) {
    setCarrinho((prev) => {
      const copia = { ...prev };
      delete copia[id];
      persistirProgresso(copia, estadoCheckout);
      return copia;
    });
  }

  function abrirCarrinho() {
    setErro("");
    mudarEtapaPainel("carrinho");
    setPainelAberto(true);
    empilharCamada("painel");
  }

  function etapaValida() {
    if (etapaPainel === "entrega") {
      if (!estadoCheckout.tipoPedido) return false;
      if (estadoCheckout.tipoPedido === "retirada") return estadoCheckout.nomeRetirada.trim().length > 1;
      if (estadoCheckout.tipoPedido === "reserva") return estadoCheckout.nomeReserva.trim().length > 1;
      return (
        estadoCheckout.nome.trim().length > 1 &&
        estadoCheckout.rua.trim().length > 1 &&
        estadoCheckout.numero.trim().length > 0 &&
        estadoCheckout.bairro.trim().length > 1
      );
    }
    if (etapaPainel === "pagamento") return !!estadoCheckout.pagamento;
    return true;
  }

  function avancarEtapa() {
    if (Object.keys(carrinho).length === 0) return;
    if (!etapaValida()) {
      setErro("Preencha essa etapa antes de continuar.");
      return;
    }
    setErro("");
    if (etapaPainel === "resumo") {
      enviarParaWhatsApp();
      return;
    }
    const idxAtual = ORDEM_ETAPAS.indexOf(etapaPainel);
    const novaEtapa = ORDEM_ETAPAS[idxAtual + 1];
    mudarEtapaPainel(novaEtapa);
    // Cada avanço de etapa grava sua PRÓPRIA entrada de histórico, com a
    // etapa já embutida no state. É isso que faz o botão físico de
    // voltar funcionar de forma confiável mesmo com toques bem colados
    // (ver comentário em aoVoltar) — sem essa entrada dedicada por
    // etapa, não haveria pra onde voltar de verdade além de fechar tudo.
    window.history.pushState(
      { ...window.history.state, camadaPedido: "painel", etapaPedido: novaEtapa },
      ""
    );
  }

  // Volta uma etapa dentro do painel (botão "Voltar" da própria tela).
  // Nunca muda a etapa diretamente — só consome a entrada de histórico
  // daquela etapa; quem efetivamente troca o que aparece na tela é
  // sempre o popstate (mesmo padrão de fecharCamadaTopo, agora também
  // pra dentro do checkout, não só pra fechar a gaveta inteira).
  function voltarEtapa() {
    setErro("");
    window.history.back();
  }

  function atualizarCampoCheckout(campo, valor) {
    setEstadoCheckout((prev) => {
      const novo = { ...prev, [campo]: valor };
      persistirProgresso(carrinho, novo);
      return novo;
    });
  }

  function enviarParaWhatsApp() {
    const itensCarrinho = montarItensCarrinho(carrinho);
    const total = calcularTotal(carrinho);
    const pagamentoInfo = PAGAMENTOS.find((p) => p.id === estadoCheckout.pagamento);

    let texto = `E aí! Bora fechar meu pedido 🍔🔥\n\n`;
    texto += `*PEDIDO BURGER HOUSE*\n`;
    texto += `——————————————\n`;

    CATEGORIAS.forEach((cat) => {
      const itensDaCategoria = itensCarrinho.filter(({ item }) => item.categoria === cat.id);
      if (itensDaCategoria.length === 0) return;
      texto += `\n*${EMOJI_CATEGORIA[cat.id] || "🍽️"} ${cat.nome}*\n`;
      itensDaCategoria.forEach(({ item, qtd, observacao }) => {
        texto += `${qtd}x ${item.nome}\n`;
        if (observacao) texto += `   obs: ${observacao}\n`;
      });
    });

    texto += `\n——————————————\n`;

    if (estadoCheckout.tipoPedido === "retirada") {
      texto += `*🏠 Como receber:* Retirar no local\n`;
      texto += `*👤 Retirar com:* ${estadoCheckout.nomeRetirada}\n`;
    } else if (estadoCheckout.tipoPedido === "reserva") {
      texto += `*🏠 Como receber:* Reserva de mesa\n`;
      texto += `*👤 Reserva no nome de:* ${estadoCheckout.nomeReserva}\n`;
    } else {
      texto += `*🏠 Como receber:* Entrega\n`;
      texto += `*👤 Responsável:* ${estadoCheckout.nome}\n`;
      texto += `*📍 Endereço:* ${estadoCheckout.rua}, ${estadoCheckout.numero} — ${estadoCheckout.bairro}`;
      texto += estadoCheckout.referencia ? ` (Ref: ${estadoCheckout.referencia})\n` : `\n`;
    }

    texto += `*💳 Pagamento:* ${pagamentoInfo?.nome || "—"}\n`;
    texto += `\n——————————————\n`;
    texto += `*Total: R$ ${total.toFixed(2).replace(".", ",")}*\n`;
    texto += `\n⚠️ *Atenção, equipe:* confira se os itens acima batem com o valor antes de confirmar o pedido.\n`;
    texto += `\nAguardando a confirmação, por favor. 🙏`;

    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;

    localStorage.removeItem(CHAVE_PROGRESSO);
    // Consome a entrada de histórico do painel (se ainda houver alguma
    // pendente na pilha) e já deixa tudo limpo de uma vez — o popstate
    // que isso dispara vai encontrar o estado já zerado e não faz nada
    // de errado (é idempotente).
    fecharCamadaTopo();
    setPainelAberto(false);
    mudarEtapaPainel("carrinho");
    setCarrinho({});
    setEstadoCheckout(estadoCheckoutInicial);
    setSucesso({ ativo: true, link });
  }

  const itensCarrinho = montarItensCarrinho(carrinho);
  const total = calcularTotal(carrinho);
  const quantidadeTotalCarrinho = itensCarrinho.reduce((acc, { qtd }) => acc + qtd, 0);

  return (
    <>
      <div className="topo topo-centralizado">
        <Link href="/" className="topo-marca">
          <Logo size={52} />
          <div className="topo-marca-texto">
            <strong>Burger House</strong>
            <small>Burgers &amp; Hot dogs</small>
          </div>
        </Link>

        {deliveryAberto !== null && (
          <div className="status-delivery status-delivery-header">
            <span className={`status-dot ${deliveryAberto ? "aberto" : "fechado"}`} />
            <strong>{deliveryAberto ? "Delivery aberto" : "Delivery fechado"}</strong>
            <a href="/duvidas" className="status-info-link">
              Informações
            </a>
          </div>
        )}
      </div>

      <TabsCategoria categorias={CATEGORIAS} ativa={categoriaAtiva} onSelecionar={irParaCategoria} />

      <div className={`menu-continuo${quantidadeTotalCarrinho > 0 ? " tem-item-no-carrinho" : ""}`}>
        {CATEGORIAS.map((cat) => {
          const itensDaCategoria = CARDAPIO.filter((item) => item.categoria === cat.id);
          if (itensDaCategoria.length === 0) return null;
          return (
            <SecaoCategoria
              key={cat.id}
              categoria={cat}
              itens={itensDaCategoria}
              carrinho={carrinho}
              onAbrirItem={abrirModalItem}
            />
          );
        })}

        <div className="pedido-cta-voltar">
          <Link href="/" className="botao botao-fantasma-claro">
            ← Voltar
          </Link>
          <BarraCarrinhoFlutuante quantidade={quantidadeTotalCarrinho} total={total} onAbrir={abrirCarrinho} />
        </div>
      </div>

      {modalItemAtivo && (
        <ModalItem
          item={modalItemAtivo}
          qtdInicial={carrinho[modalItemAtivo.id]?.qtd || 0}
          observacaoInicial={carrinho[modalItemAtivo.id]?.observacao || ""}
          onFechar={fecharCamadaTopo}
          onConfirmar={confirmarModalItem}
        />
      )}

      {painelAberto && (
        <PainelCarrinho
          etapa={etapaPainel}
          itensCarrinho={itensCarrinho}
          total={total}
          estado={estadoCheckout}
          onAlterarCampo={atualizarCampoCheckout}
          onAlterarQtd={alterarQtdCarrinho}
          onRemoverItem={removerItemCarrinho}
          onEditarItem={abrirModalItem}
          onVoltar={voltarEtapa}
          onAvancar={avancarEtapa}
          onFechar={fecharCamadaTopo}
          erro={erro}
        />
      )}

      {/* Tela de confirmação: o pedido só é concluído quando enviado pelo WhatsApp */}
      <div className={`overlay-sucesso${sucesso.ativo ? " ativo" : ""}`}>
        <div className="cartao-sucesso">
          <div
            className="icone-check"
            style={{ background: "var(--laranja)", boxShadow: "0 3px 0 var(--laranja-escuro)", color: "var(--preto)" }}
          >
            💬
          </div>
          <h2 className="sucesso-titulo" style={{ color: "var(--laranja-escuro)" }}>
            Falta só finalizar no WhatsApp!
          </h2>
          <p className="sucesso-texto">
            Seu pedido ainda não foi enviado. Toque no botão abaixo para finalizar no WhatsApp — é lá que a
            hamburgueria vai receber e confirmar tudo certinho.
          </p>
          <p className="sucesso-sub">Vamos abrir o WhatsApp automaticamente em instantes. Se não abrir, toque no botão abaixo.</p>
          <button className="btn-abrir-whats" onClick={() => window.open(sucesso.link, "_blank")}>
            Finalizar pedido no WhatsApp
          </button>
          <button className="btn-voltar-inicio" onClick={() => (window.location.href = "/")}>
            Voltar ao início
          </button>
        </div>
      </div>
    </>
  );
}