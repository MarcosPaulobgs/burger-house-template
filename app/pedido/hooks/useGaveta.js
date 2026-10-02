"use client";

import { useEffect, useRef } from "react";

// Pilha global das gavetas abertas no momento, compartilhada entre todas
// as instâncias do hook. Existe porque uma gaveta pode abrir por cima da
// outra (ex.: editar um item do carrinho abre o modal do item por cima do
// próprio painel do carrinho) — o botão/gesto de voltar deve fechar só a
// que está no topo, não as duas de uma vez.
let pilhaGavetas = [];
let contadorGaveta = 0;

/**
 * Use em qualquer overlay do tipo "gaveta" (ModalItem, PainelCarrinho...).
 * Chame sempre com `aberto = true` a partir de componentes que só são
 * montados enquanto estiverem abertos (ex.: `{ativo && <Gaveta />}`).
 */
export default function useGaveta(aberto, onFechar) {
  const onFecharRef = useRef(onFechar);
  onFecharRef.current = onFechar;
  // Marca se este fechamento está acontecendo por causa do gesto/botão de
  // voltar (popstate) — nesse caso a entrada de histórico já foi consumida
  // pela navegação real e não precisamos fazer nada no cleanup.
  const fechandoPorVoltarRef = useRef(false);
  // "Geração" desta gaveta: incrementa a cada vez que o efeito roda de
  // verdade. Existe por causa do Strict Mode do React em desenvolvimento,
  // que desmonta e remonta o componente logo em seguida só para testar o
  // cleanup — sem isso, o cleanup dessa desmontagem fake acharia que a
  // gaveta fechou de vez e consumiria o histórico, fechando o modal
  // sozinho um instante depois de ele abrir.
  const geracaoRef = useRef(0);

  useEffect(() => {
    if (!aberto) return;
    fechandoPorVoltarRef.current = false;
    const minhaGeracao = ++geracaoRef.current;

    // Trava o scroll da página por trás enquanto a gaveta está aberta.
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Empilha uma entrada de histórico com um id único: o botão/gesto de
    // voltar do aparelho dispara "popstate" aqui em vez de navegar para a
    // página anterior.
    const idGaveta = ++contadorGaveta;
    const chave = { idGaveta };
    pilhaGavetas.push(chave);
    // Preserva o state que já estava na entrada atual (é ali que o App
    // Router do Next guarda os dados internos da sua árvore de navegação —
    // o "flight router state"). Se sobrescrevêssemos o state inteiro com só
    // { gaveta, idGaveta }, o Next perderia essa entrada de vista e o
    // popstate de retorno deixaria de ser reconhecido como navegação válida,
    // exigindo vários toques no botão de voltar até sair da página.
    window.history.pushState(
      { ...window.history.state, gaveta: true, idGaveta },
      ""
    );

    function aoVoltar(evento) {
      // Só reage se esta for a gaveta do topo da pilha (a mais recente).
      if (pilhaGavetas[pilhaGavetas.length - 1] !== chave) return;
      // Se o novo estado do histórico ainda referencia esta própria
      // gaveta, é porque este popstate foi disparado apenas para
      // "descartar" uma entrada órfã de uma gaveta mais interna que já
      // fechou (ver cleanup abaixo) — não fecha nada aqui.
      if (evento.state && evento.state.idGaveta === idGaveta) return;
      pilhaGavetas.pop();
      fechandoPorVoltarRef.current = true;
      onFecharRef.current();
    }
    window.addEventListener("popstate", aoVoltar);

    return () => {
      document.body.style.overflow = overflowOriginal;
      window.removeEventListener("popstate", aoVoltar);
      const idx = pilhaGavetas.indexOf(chave);
      if (idx !== -1) pilhaGavetas.splice(idx, 1);

      if (fechandoPorVoltarRef.current) return;

      // Fechado pela UI (X, clique fora, Esc, "Adicionar" etc.) e não pelo
      // gesto de voltar: a entrada de histórico que empilhamos ficou
      // "pendurada" e precisa ser consumida com history.back(). Adiamos
      // essa decisão para o próximo tick: se este for o cleanup "de
      // mentira" do Strict Mode (o efeito já rodou de novo, incrementando
      // geracaoRef antes deste setTimeout executar), não fazemos nada,
      // porque a gaveta continua aberta de verdade.
      setTimeout(() => {
        if (geracaoRef.current !== minhaGeracao) return;
        window.history.back();
      }, 0);
    };
  }, [aberto]);
}
