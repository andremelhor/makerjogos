/* ==========================================================
   main.js — inicialização. Roda em todas as páginas.
   ========================================================== */
(function () {
  var MJ = window.MJ;

  MJ.renderHeader();
  MJ.renderFooter();

  /* Grade de jogos: <div id="games-grid" data-limit="3" data-destaque="true"> */
  var grid = document.getElementById('games-grid');
  if (grid) {
    var list = MJ.localGames();
    if (grid.getAttribute('data-destaque') === 'true') {
      list = list.filter(function (g) { return g.destaque; });
    }
    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    if (limit) list = list.slice(0, limit);
    grid.innerHTML = list.length ? list.map(MJ.renderGameCard).join('') : '<p>' + MJ.esc(MJ.t('noGames')) + '</p>';
  }

  /* Link para âncora que é um <details> (ex.: #refunds): abre o item */
  function openHashDetails() {
    var el = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      el.scrollIntoView();
    }
  }
  openHashDetails();
  window.addEventListener('hashchange', openHashDetails);

  /* Página Contact/Contato */
  var contact = document.getElementById('contact-channels');
  if (contact) MJ.renderContact(contact);

  /* Página de detalhe do jogo */
  var detail = document.getElementById('game-detail');
  if (detail) MJ.renderGameDetail(detail);

  /* Inicializa todos os carrosséis de jogos na página (setas, bolinhas e swipe) */
  if (MJ.initCarousels) MJ.initCarousels();
})();