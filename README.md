# Maker Jogos — site de jogos Print & Play (inglês + português)

Site estático (HTML + CSS + JavaScript puro). Sem build, sem dependências.

## Estrutura
```
/                 -> INGLÊS (makerjogos.com abre aqui)
  index.html, how-it-works.html, about.html, contact.html
  games/index.html, games/game.html
/br/              -> PORTUGUÊS
  index.html, como-funciona.html, sobre.html, contato.html
  jogos/index.html, jogos/jogo.html
css/, js/, assets/, favicon.ico   -> compartilhados pelos dois idiomas
```

## Como abrir e editar
1. Abra a pasta no VS Code.
2. Abra `index.html` (inglês) ou `br/index.html` (português) no navegador. Funciona sem servidor.
3. (Opcional) Extensão **Live Server** para recarregar a página ao salvar.

## Onde editar cada coisa
| Quero... | Edite |
|---|---|
| Nome do site, e-mail, WhatsApp, redes sociais | `js/config.js` |
| Ligar/desligar o seletor de idioma (bandeira) | `js/config.js` > `languages` (comente uma linha) |
| Onde fica cada página em cada idioma | `js/config.js` > `routes` |
| Itens do menu e submenus (EN e PT) | `js/data/menu.js` |
| Adicionar ou alterar um jogo (EN e PT) | `js/data/games.js` |
| Botões, rodapé, textos da página de jogo | `js/data/i18n.js` |
| Textos das páginas (Home, Como funciona, Sobre, Contato) | o `.html` de cada idioma |
| Cores, fontes, medidas | `css/tokens.css` |
| Aparência do menu, cards, rodapé, bandeiras | `css/components.css` |

Header e footer são gerados por `js/components/` a partir desses dados, então
uma alteração vale para todas as páginas. **Não edite o menu nos `.html`.**

## Idiomas
- A bandeira no topo mostra sempre o OUTRO idioma e leva à página EQUIVALENTE
  (ex.: `about.html` <-> `br/sobre.html`). Isso vem de `<body data-page="...">` em cada
  página + `routes` no `config.js`.
- Cada página declara o idioma em `<html lang="en">` ou `<html lang="pt-BR">`.
- Faixa de sugestão: se o navegador do visitante estiver no outro idioma, aparece uma
  faixa discreta oferecendo a versão dele (não redireciona à força). Desligue com
  `suggestLanguage: false` no `config.js`.
- Para criar uma página nova: copie a de outro idioma/tipo, ajuste o `data-page`, o
  `<html lang>` e o `data-root` (`""` na raiz, `"../"` um nível abaixo, `"../../"` dois), e
  registre a rota em `routes`.

## Adicionar um jogo
1. Coloque as imagens em `assets/img/games/<slug-do-jogo>/`.
2. Em `js/data/games.js`, copie um bloco, troque o `slug` e preencha `pt` e `en`
   (título, resumo, descrição, preço, link da Kiwify...). Preço `pt` em reais, `en` em dólares.
3. O card, a página do jogo e o item do submenu aparecem sozinhos. Um jogo só aparece no
   site de um idioma se tiver o bloco desse idioma.

## Marca
- Cores medidas no logo: laranja `#F15626` e grafite `#373A3F` (em `css/tokens.css`).
- Botões e links usam `#C93F12`, versão escurecida do laranja (contraste 5,0:1 com branco;
  o laranja puro tem 3,4:1, abaixo do mínimo de 4,5:1 para texto).
- Fonte dos títulos: Montserrat (SIL OFL), em `assets/fonts/`.
- Imagens: `assets/img/ui/` (logo, favicons, bandeiras), `assets/img/hero-art.webp` (Home),
  `assets/img/og-image.jpg` (prévia ao compartilhar), `favicon.ico` na raiz.

## Antes de publicar
- Trocar os links `https://pay.kiwify.com.br/SEU-LINK-AQUI` / `YOUR-LINK-HERE` pelos reais.
- Trocar os textos marcados com "EXEMPLO"/"EXAMPLE" (jogos).
- Preencher `js/config.js` (e-mail, WhatsApp, Instagram, TikTok).
- Decidir como vender em inglês (checkout, moeda, reembolso internacional) e revisar os
  textos de Como comprar/Refunds da versão em inglês.
- O `og:image` aponta para `https://makerjogos.com/...`: a prévia ao compartilhar só funciona
  com o domínio no ar.
- Depois de escolher a hospedagem: adicionar `hreflang`/`canonical` e `sitemap.xml`
  (o formato das URLs, com ou sem `.html`, depende da hospedagem).

## Publicação
Qualquer hospedagem de site estático serve: publique a pasta inteira. Não há comando de build.
