/* ==========================================================
   game-detail.js — monta a página de um jogo a partir de
   games/game.html?game=<slug>  (ou br/jogos/jogo.html?jogo=<slug>)
   ========================================================== */
(function () {
  var MJ = window.MJ;

  function fact(label, value) {
    return value ? '<div class="fact"><dt>' + MJ.esc(label) + '</dt><dd>' + MJ.esc(value) + '</dd></div>' : '';
  }

  function extractYouTubeId(url) {
    if (!url) return '';
    var match = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
    return /^[a-zA-Z0-9_-]{11}$/.test(String(url).trim()) ? String(url).trim() : '';
  }

  function renderVideo(game) {
    var id = extractYouTubeId(game.videoUrl);
    if (!id) return '';
    var title = MJ.lang() === 'pt' ? 'Vídeo de apresentação' : 'Game overview video';
    var autoPlay = new URLSearchParams(window.location.search).get('play') === '1';
    var params = autoPlay ? '?autoplay=1&mute=1&rel=0' : '?rel=0';

    var cta = game.kiwifyUrl
      ? '<div class="video-cta">' +
          MJ.renderPrice(game) +
          '<a class="btn btn--primary btn--lg" href="' + MJ.esc(game.kiwifyUrl) + '" target="_blank" rel="noopener noreferrer">' + MJ.esc(MJ.t('buyNow')) + '</a>' +
        '</div>'
      : '';

    return '<div class="detail-video" id="video">' +
      '<h2>' + MJ.esc(title) + '</h2>' +
      '<div class="video-frame">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + MJ.esc(id) + params + '" ' +
          'title="' + MJ.esc(game.titulo + ' - ' + title) + '" ' +
          'loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>' +
        '</iframe>' +
      '</div>' +
      cta +
    '</div>';
  }

  function setMeta(game) {
    document.title = game.titulo + ' | ' + MJ.config.siteName;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', game.resumo);
  }

  MJ.renderGameDetail = function (host) {
    var slug = MJ.currentSlug();
    var game = MJ.localGames().filter(function (g) { return g.slug === slug; })[0];

    if (!game) {
      host.innerHTML = '<div class="notice"><h1>' + MJ.esc(MJ.t('notFoundTitle')) + '</h1>' +
        '<p>' + MJ.esc(MJ.t('notFoundText')) + '</p>' +
        '<p><a class="btn btn--primary" href="' + MJ.esc(MJ.url(MJ.route('games'))) + '">' + MJ.esc(MJ.t('seeAll')) + '</a></p></div>';
      return;
    }

    setMeta(game);

    var paragraphs = (game.descricao || []).map(function (p) { return '<p>' + MJ.esc(p) + '</p>'; }).join('');
    var included = (game.incluso || []).map(function (i) { return '<li>' + MJ.esc(i) + '</li>'; }).join('');

    host.innerHTML =
      '<nav class="breadcrumb" aria-label="' + MJ.esc(MJ.t('breadcrumbLabel')) + '"><a href="' + MJ.esc(MJ.homeUrl()) + '">' + MJ.esc(MJ.t('breadcrumbHome')) + '</a> / ' +
        '<a href="' + MJ.esc(MJ.url(MJ.route('games'))) + '">' + MJ.esc(MJ.t('breadcrumbGames')) + '</a> / <span>' + MJ.esc(game.titulo) + '</span></nav>' +
      '<div class="detail-grid">' +
        '<div class="detail-media">' + MJ.renderCover(game, 'eager') + '</div>' +
        '<div class="detail-info">' +
          '<h1>' + MJ.esc(game.titulo) + '</h1>' +
          MJ.renderPrice(game) +
          '<a class="btn btn--primary btn--lg" href="' + MJ.esc(game.kiwifyUrl) + '" target="_blank" rel="noopener noreferrer">' + MJ.esc(MJ.t('buyNow')) + '</a>' +
          '<p class="fine-print">' + MJ.esc(MJ.t('finePrint')) + '</p>' +
          '<dl class="facts">' +
            fact(MJ.t('players'), game.jogadores) + fact(MJ.t('duration'), game.duracao) +
            fact(MJ.t('age'), game.idade) + fact(MJ.t('format'), game.arquivo) +
          '</dl>' +
        '</div>' +
      '</div>' +
      renderVideo(game) +
      '<div class="detail-text">' + paragraphs +
        (included ? '<h2>' + MJ.esc(MJ.t('included')) + '</h2><ul class="check-list">' + included + '</ul>' : '') +
      '</div>';

    if (MJ.initCarousels) MJ.initCarousels(host);
  };
})();