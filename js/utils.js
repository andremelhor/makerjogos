/* ==========================================================
   utils.js — funções compartilhadas.
   Todos os scripts usam o namespace global "MJ" (sem módulos ES,
   para funcionar também ao abrir o arquivo direto no navegador).
   ========================================================== */
window.MJ = window.MJ || {};

/* Escapa texto antes de inserir em HTML. */
MJ.esc = function (value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

/* Prefixo até a raiz do site. Cada página declara <body data-root="">
   (raiz), "../" (uma pasta abaixo), "../../" (duas) etc. */
MJ.root = function () {
  return document.body.getAttribute('data-root') || '';
};

/* Monta um caminho a partir da raiz: MJ.url('games/index.html') */
MJ.url = function (path) {
  return MJ.root() + path;
};

/* Idioma da página atual, lido de <html lang="...">. */
MJ.lang = function () {
  return (document.documentElement.getAttribute('lang') || MJ.config.defaultLang || 'en').slice(0, 2).toLowerCase();
};

/* Dados do idioma no config (locale, moeda...). */
MJ.langInfo = function (code) {
  var list = MJ.config.languages || [];
  var want = code || MJ.lang();
  for (var i = 0; i < list.length; i++) if (list[i].code === want) return list[i];
  return list[0] || { code: want, locale: 'en-US', currency: 'USD' };
};

/* Texto traduzido: MJ.t('buy'), MJ.t('coverAlt', { x: 'Jogo' }) */
MJ.t = function (key, vars) {
  var dict = MJ.i18n[MJ.lang()] || {};
  var s = dict[key];
  if (s == null) s = (MJ.i18n.en || {})[key];
  if (s == null) return key;
  return s.replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
};

/* Caminho (a partir da raiz) de uma página em um idioma: MJ.route('about', 'pt') */
MJ.route = function (page, lang) {
  var r = MJ.config.routes[page];
  return r ? (r[lang || MJ.lang()] || '') : '';
};

/* Caminho de uma página de jogo, com o parâmetro do idioma. */
MJ.gameHref = function (slug, lang) {
  var l = lang || MJ.lang();
  return MJ.route('game', l) + '?' + MJ.config.gameParam[l] + '=' + encodeURIComponent(slug);
};

/* Slug do jogo aberto na página atual (ou null). */
MJ.currentSlug = function () {
  return new URLSearchParams(window.location.search).get(MJ.config.gameParam[MJ.lang()]);
};

/* Endereço da página inicial no idioma atual. */
MJ.homeUrl = function () {
  return MJ.url(MJ.route('home'));
};

/* Endereço da página EQUIVALENTE no outro idioma (a página declara
   <body data-page="about"> e o config.routes diz onde ela fica). */
MJ.altUrl = function (code) {
  var page = document.body.getAttribute('data-page') || 'home';
  if (page === 'game') {
    var slug = MJ.currentSlug();
    if (slug) return MJ.url(MJ.gameHref(slug, code));
  }
  return MJ.url(MJ.route(MJ.config.routes[page] ? page : 'home', code));
};

/* Preço na moeda do idioma da página: 6.99 -> "$6.99" / 29.9 -> "R$ 29,90" */
MJ.formatPrice = function (value) {
  var info = MJ.langInfo();
  return new Intl.NumberFormat(info.locale, { style: 'currency', currency: info.currency }).format(value);
};

/* Jogos que têm texto no idioma da página, já "achatados" (campos do idioma
   + slug, imagens, capa, galeria, destaque). Jogo sem tradução não aparece. */
MJ.localGames = function () {
  var lang = MJ.lang();
  return (MJ.games || []).filter(function (g) { return g[lang]; }).map(function (g) {
    var base = {
      slug: g.slug,
      destaque: g.destaque,
      imagens: g.imagens || [],
      capa: g.capa,
      galeria: g.galeria || []
    };
    var text = g[lang];
    for (var k in text) if (Object.prototype.hasOwnProperty.call(text, k)) base[k] = text[k];
    return base;
  });
};