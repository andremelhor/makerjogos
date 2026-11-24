/* ==========================================================
   game-detail.js — monta a página de um jogo a partir de
   jogos/jogo.html?jogo=<slug>
   ========================================================== */
(function () {
  var MJ = window.MJ;

  function fact(label, value) {
    return value ? '<div class="fact"><dt>' + MJ.esc(label) + '</dt><dd>' + MJ.esc(value) + '</dd></div>' : '';
  }

  function setMeta(game) {
    document.title = game.titulo + ' | ' + MJ.config.siteName;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', game.resumo);
  }

  MJ.renderGameDetail = function (host) {
    var slug = new URLSearchParams(window.location.search).get('jogo');
    var game = (MJ.games || []).filter(function (g) { return g.slug === slug; })[0];

    if (!game) {
      host.innerHTML = '<div class="notice"><h1>Jogo não encontrado</h1>' +
        '<p>Esse link não corresponde a nenhum jogo do catálogo.</p>' +
        '<p><a class="btn btn--primary" href="' + MJ.esc(MJ.url('jogos/index.html')) + '">Ver todos os jogos</a></p></div>';
      return;
    }

    setMeta(game);

    var paragraphs = (game.descricao || []).map(function (p) { return '<p>' + MJ.esc(p) + '</p>'; }).join('');
    var included = (game.incluso || []).map(function (i) { return '<li>' + MJ.esc(i) + '</li>'; }).join('');
    var gallery = (game.galeria || []).map(function (img, i) {
      return '<img src="' + MJ.esc(MJ.url(img)) + '" alt="' + MJ.esc(game.titulo) + ' — foto ' + (i + 1) + '" loading="lazy">';
    }).join('');

    host.innerHTML =
      '<nav class="breadcrumb" aria-label="Você está em"><a href="' + MJ.esc(MJ.url('index.html')) + '">Início</a> / ' +
        '<a href="' + MJ.esc(MJ.url('jogos/index.html')) + '">Jogos</a> / <span>' + MJ.esc(game.titulo) + '</span></nav>' +
      '<div class="detail-grid">' +
        '<div class="detail-media">' + MJ.renderCover(game, 'eager') + '</div>' +
        '<div class="detail-info">' +
          '<h1>' + MJ.esc(game.titulo) + '</h1>' +
          MJ.renderPrice(game) +
          '<a class="btn btn--primary btn--lg" href="' + MJ.esc(game.kiwifyUrl) + '" target="_blank" rel="noopener noreferrer">Comprar agora</a>' +
          '<p class="fine-print">Pagamento seguro na Kiwify. Produto digital: você recebe o arquivo para imprimir.</p>' +
          '<dl class="facts">' +
            fact('Jogadores', game.jogadores) + fact('Duração', game.duracao) +
            fact('Idade', game.idade) + fact('Formato', game.arquivo) +
          '</dl>' +
        '</div>' +
      '</div>' +
      '<div class="detail-text">' + paragraphs +
        (included ? '<h2>O que vem no arquivo</h2><ul class="check-list">' + included + '</ul>' : '') +
      '</div>' +
      (gallery ? '<h2>Fotos</h2><div class="gallery">' + gallery + '</div>' : '');
  };
})();
