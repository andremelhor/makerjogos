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
    var list = MJ.games.slice();
    if (grid.getAttribute('data-destaque') === 'true') {
      list = list.filter(function (g) { return g.destaque; });
    }
    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    if (limit) list = list.slice(0, limit);
    grid.innerHTML = list.length ? list.map(MJ.renderGameCard).join('') : '<p>Novos jogos em breve.</p>';
  }

  /* Página de detalhe */
  var detail = document.getElementById('game-detail');
  if (detail) MJ.renderGameDetail(detail);
})();
