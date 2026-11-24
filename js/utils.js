/* ==========================================================
   utils.js — funções utilitárias compartilhadas
   Todos os scripts usam o namespace global "MJ" (sem módulos ES,
   para funcionar também ao abrir o arquivo direto no navegador).
   ========================================================== */
window.MJ = window.MJ || {};

/* Escapa texto antes de inserir em HTML (evita quebrar a página
   e bloqueia injeção de código via parâmetros de URL). */
MJ.esc = function (value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
};

/* Prefixo até a raiz do site. Cada página declara <body data-root="">
   (raiz), <body data-root="../"> (dentro de /jogos/) etc. */
MJ.root = function () {
  return document.body.getAttribute('data-root') || '';
};

/* Monta um caminho a partir da raiz: MJ.url('jogos/index.html') */
MJ.url = function (path) {
  return MJ.root() + path;
};

/* Formata preço em reais: 29.9 -> "R$ 29,90" */
MJ.formatPrice = function (value) {
  return new Intl.NumberFormat(MJ.config.locale, {
    style: 'currency',
    currency: MJ.config.currency
  }).format(value);
};
