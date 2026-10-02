# Burger House — Template de Hamburgueria (Next.js)

Site institucional + pedido guiado com finalização no WhatsApp, em **Next.js 14 (App Router)** e CSS puro.
Modelo genérico: marca, contatos e imagens são placeholders prontos para trocar.

## O que trocar para um cliente

- `app/data/cardapio.js`: cardápio, categorias, `NUMERO_WHATSAPP`, `INSTAGRAM_URL`
- `app/styles/tokens.css`: cores e fontes
- `public/assets/img/`: logo, selo, fotos (mesmos nomes, ou ajuste os `src`)
- `app/layout.js`, `app/page.js`, `app/manifest.js`, `app/sitemap.js`, `app/robots.js`: nome, descrição e domínio (`seusite.com.br`)
- Rodapé (`app/components/home/Footer/Footer.jsx`): endereço, horário e link do mapa
- Hero: o vídeo e o poster ficam em `app/components/home/Hero/Hero.jsx`

## Rotas

| Rota | O que faz |
|------|-----------|
| `/` | Hero em vídeo, destaques, "como funciona", sobre e rodapé |
| `/pedido` | Cardápio em abas + carrinho + pedido em 4 etapas, enviado ao WhatsApp |
| `/duvidas` | FAQ em acordeão |

## Rodando

```bash
npm install
npm run dev
```

MIT — veja `LICENSE`.
