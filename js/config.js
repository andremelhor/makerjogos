/* ==========================================================
   config.js — dados gerais do site (edite aqui)

   ESTRUTURA DO SITE
     /            -> inglês (raiz)
     /br/         -> português
     css, js, assets -> compartilhados pelos dois idiomas
   ========================================================== */
window.MJ = window.MJ || {};

MJ.config = {
  siteName: 'Maker Jogos',
  domain: 'https://makerjogos.com',

  // Logo horizontal (caminho a partir da raiz do site)
  logo: 'assets/img/ui/logo.webp',

  // Idioma usado quando a página não declara <html lang="...">
  defaultLang: 'en',

  // Faixa de sugestão de idioma desativada
  suggestLanguage: false,

  /* Seletor de idioma (bandeira + código), logo após o menu. */
  languages: [
    { code: 'en', short: 'EN', label: 'English',   flag: 'assets/img/ui/flag-us.svg', locale: 'en-US', currency: 'USD' },
    { code: 'pt', short: 'PT', label: 'Português', flag: 'assets/img/ui/flag-br.svg', locale: 'pt-BR', currency: 'BRL' }
  ],

  /* Onde fica cada página em cada idioma (caminho a partir da raiz). */
  routes: {
    home:    { en: 'index.html',        pt: 'br/index.html' },
    games:   { en: 'games/index.html',  pt: 'br/jogos/index.html' },
    game:    { en: 'games/game.html',   pt: 'br/jogos/jogo.html' },
    how:     { en: 'how-it-works.html', pt: 'br/como-funciona.html' },
    about:   { en: 'about.html',        pt: 'br/sobre.html' },
    contact: { en: 'contact.html',      pt: 'br/contato.html' }
  },

  // Nome do parâmetro de URL da página de jogo: games/game.html?game=slug
  gameParam: { en: 'game', pt: 'jogo' },

  // Canais de contato. Deixe '' para esconder o item.
  email: '',            // ex.: 'contato@makerjogos.com'
  whatsapp: '5571988014184',         // só números com DDI+DDD, ex.: '5571999999999'

  // Redes sociais separadas por idioma
  social: {
    pt: [
      { label: 'YouTube (@makerjogos)', url: 'https://www.youtube.com/@makerjogos' },
      { label: 'Instagram', url: '' },
      { label: 'TikTok', url: '' }
    ],
    en: [
      { label: 'YouTube (@makerjogosglobal)', url: 'https://www.youtube.com/@makerjogosglobal' },
      { label: 'Instagram', url: '' },
      { label: 'TikTok', url: '' }
    ]
  }
};