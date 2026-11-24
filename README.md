# Maker Jogos — site de jogos Print & Play

Site estático (HTML + CSS + JavaScript puro). Sem build, sem dependências.

## Como abrir e editar
1. Abra a pasta no VS Code.
2. Abra `index.html` com duplo clique no navegador. Funciona sem servidor.
3. (Opcional) Extensão **Live Server** para recarregar a página ao salvar.

## Onde editar cada coisa
| Quero... | Edite |
|---|---|
| Mudar nome do site, e-mail, redes sociais | `js/config.js` |
| Adicionar/remover item do menu ou submenu | `js/data/menu.js` |
| Adicionar ou alterar um jogo | `js/data/games.js` |
| Mudar cores, fontes, medidas | `css/tokens.css` |
| Mudar aparência do menu, cards, rodapé | `css/components.css` |

Header e footer são gerados por `js/components/` a partir desses dados, então
uma alteração vale para todas as páginas.

## Adicionar um jogo
1. Coloque as imagens em `assets/img/games/<slug-do-jogo>/`.
2. Em `js/data/games.js`, copie um bloco, troque o `slug` e preencha os campos,
   incluindo `kiwifyUrl` com o link de checkout real.
3. O card (Home e catálogo), a página do jogo e o item do submenu "Jogos" aparecem sozinhos.

## Marca
- Cores medidas no logo: laranja `#F15626` e grafite `#373A3F` (em `css/tokens.css`).
- Botões e links usam `#C93F12`, versão escurecida do laranja, porque o laranja puro
  tem contraste de 3,4:1 com branco (o mínimo para texto é 4,5:1).
- Fonte dos títulos: Montserrat (a do logo), hospedada em `assets/fonts/` (licença OFL).
- Imagens: `assets/img/ui/` (logo, favicons), `assets/img/hero-art.webp` (Home), `assets/img/og-image.jpg` (prévia ao compartilhar).

## Antes de publicar
- Trocar todos os `https://pay.kiwify.com.br/SEU-LINK-AQUI` pelos links reais.
- Trocar textos marcados com "EXEMPLO" (Sobre, Contato, descrições).
- Preencher `js/config.js` (domínio, e-mail, redes).
- O `og:image` das páginas aponta para `https://makerjogos.com/...`: a prévia ao compartilhar só funciona depois que o domínio estiver no ar.

## Publicação
Qualquer hospedagem de site estático serve: publique a pasta inteira.
Não há comando de build.
