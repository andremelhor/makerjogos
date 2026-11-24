/* ==========================================================
   game-card.js — card de jogo usado na Home e no catálogo
   ========================================================== */
(function () {
  var MJ = window.MJ;

  MJ.renderCover = function (game, size) {
    if (game.capa) {
      return '<img class="cover" src="' + MJ.esc(MJ.url(game.capa)) + '" alt="Capa do jogo ' + MJ.esc(game.titulo) +
        '" loading="' + (size === 'eager' ? 'eager' : 'lazy') + '">';
    }
    return '<div class="cover cover--placeholder" role="img" aria-label="Capa de ' + MJ.esc(game.titulo) + ' (em breve)">' +
      MJ.esc(game.titulo.charAt(0)) + '</div>';
  };

  MJ.renderPrice = function (game) {
    var old = game.precoDe ? '<s class="price-old">' + MJ.formatPrice(game.precoDe) + '</s> ' : '';
    return '<p class="price">' + old + '<strong>' + MJ.formatPrice(game.preco) + '</strong></p>';
  };

  MJ.renderGameCard = function (game) {
    var detail = MJ.url('jogos/jogo.html?jogo=' + encodeURIComponent(game.slug));
    return '<article class="card">' +
      '<a class="card-media" href="' + MJ.esc(detail) + '" tabindex="-1" aria-hidden="true">' + MJ.renderCover(game) + '</a>' +
      '<div class="card-body">' +
        '<h3 class="card-title"><a href="' + MJ.esc(detail) + '">' + MJ.esc(game.titulo) + '</a></h3>' +
        '<p class="card-text">' + MJ.esc(game.resumo) + '</p>' +
        MJ.renderPrice(game) +
        '<div class="card-actions">' +
          '<a class="btn btn--ghost" href="' + MJ.esc(detail) + '">Ver detalhes</a>' +
          '<a class="btn btn--primary" href="' + MJ.esc(game.kiwifyUrl) + '" target="_blank" rel="noopener noreferrer">Comprar</a>' +
        '</div>' +
      '</div></article>';
  };
})();
