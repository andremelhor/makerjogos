/* ==========================================================
   game-card.js — card de jogo e carrossel automático/manual (1 a 5 fotos).
   Recebe um jogo "achatado" (MJ.localGames()).
   ========================================================== */
(function () {
  var MJ = window.MJ;

  /* Coleta até 5 imagens do jogo (prioriza array 'imagens', mas aceita 'capa' + 'galeria') */
  MJ.getGameImages = function (game) {
    var list = [];
    if (Array.isArray(game.imagens) && game.imagens.length) {
      list = game.imagens.filter(Boolean);
    } else {
      if (game.capa) list.push(game.capa);
      if (Array.isArray(game.galeria) && game.galeria.length) {
        list = list.concat(game.galeria.filter(Boolean));
      }
    }
    return list.slice(0, 5); // Limite rígido de até 5 imagens
  };

  MJ.renderCover = function (game, size, href) {
    var imgs = MJ.getGameImages(game);
    var loading = size === 'eager' ? 'eager' : 'lazy';

    // Sem nenhuma imagem cadastrada -> placeholder laranja/grafite
    if (!imgs.length) {
      var placeholder = '<div class="cover cover--placeholder" role="img" aria-label="' + MJ.esc(MJ.t('coverSoon', { x: game.titulo })) + '">' +
        MJ.esc(game.titulo.charAt(0)) + '</div>';
      return href ? '<a class="card-media" href="' + MJ.esc(href) + '" tabindex="-1" aria-hidden="true">' + placeholder + '</a>' : placeholder;
    }

    // Apenas 1 imagem -> exibe limpa, sem setas ou indicadores
    if (imgs.length === 1) {
      var single = '<img class="cover" src="' + MJ.esc(MJ.url(imgs[0])) + '" alt="' + MJ.esc(MJ.t('coverAlt', { x: game.titulo })) + '" loading="' + loading + '">';
      return href ? '<a class="card-media" href="' + MJ.esc(href) + '" tabindex="-1" aria-hidden="true">' + single + '</a>' : single;
    }

    // De 2 a 5 imagens -> monta o carrossel
    var slides = imgs.map(function (src, idx) {
      var imgTag = '<img class="cover" src="' + MJ.esc(MJ.url(src)) + '" alt="' + MJ.esc(MJ.t('coverAlt', { x: game.titulo })) + ' (' + (idx + 1) + '/' + imgs.length + ')" loading="' + (idx === 0 ? loading : 'lazy') + '">';
      var content = href ? '<a class="carousel-link" href="' + MJ.esc(href) + '" tabindex="-1">' + imgTag + '</a>' : imgTag;
      return '<div class="carousel-slide' + (idx === 0 ? ' is-active' : '') + '">' + content + '</div>';
    }).join('');

    var dots = imgs.map(function (_, idx) {
      return '<button type="button" class="carousel-dot' + (idx === 0 ? ' is-active' : '') + '" data-slide="' + idx + '" aria-label="Imagem ' + (idx + 1) + '"></button>';
    }).join('');

    return '<div class="game-carousel" data-index="0">' +
      '<div class="carousel-track">' + slides + '</div>' +
      '<button type="button" class="carousel-btn carousel-btn--prev" aria-label="Anterior">&#8249;</button>' +
      '<button type="button" class="carousel-btn carousel-btn--next" aria-label="Próxima">&#8250;</button>' +
      '<div class="carousel-dots">' + dots + '</div>' +
    '</div>';
  };

  MJ.initCarousels = function (root) {
    (root || document).querySelectorAll('.game-carousel').forEach(function (carousel) {
      if (carousel.dataset.ready) return;
      carousel.dataset.ready = '1';

      var slides = carousel.querySelectorAll('.carousel-slide');
      var dots = carousel.querySelectorAll('.carousel-dot');
      var prev = carousel.querySelector('.carousel-btn--prev');
      var next = carousel.querySelector('.carousel-btn--next');
      var total = slides.length;
      var current = 0;
      var timer = null;
      var delay = 4000; // Tempo de troca automática: 4 segundos (4000 ms)

      function goTo(index) {
        current = (index + total) % total;
        slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
      }

      function startAuto() {
        stopAuto();
        timer = setInterval(function () {
          goTo(current + 1);
        }, delay);
      }

      function stopAuto() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      if (prev) {
        prev.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(current - 1);
          startAuto();
        });
      }

      if (next) {
        next.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(current + 1);
          startAuto();
        });
      }

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(i);
          startAuto();
        });
      });

      // Pausa a troca automática quando o mouse está em cima da imagem
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);

      // Suporte a deslize (swipe) no celular
      var startX = 0;
      carousel.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        stopAuto();
      }, { passive: true });

      carousel.addEventListener('touchend', function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 35) {
          goTo(diff > 0 ? current + 1 : current - 1);
        }
        startAuto();
      }, { passive: true });

      // Inicia a rotação automática
      startAuto();
    });
  };

  MJ.renderPrice = function (game) {
    var old = game.precoDe ? '<s class="price-old">' + MJ.formatPrice(game.precoDe) + '</s> ' : '';
    return '<p class="price">' + old + '<strong>' + MJ.formatPrice(game.preco) + '</strong></p>';
  };

  function renderVideoShortcut(game) {
    if (!game.videoUrl) return '';
    var sep = MJ.gameHref(game.slug).indexOf('?') === -1 ? '?' : '&';
    var href = MJ.url(MJ.gameHref(game.slug) + sep + 'play=1#video');
    var label = MJ.lang() === 'pt' ? '▶ Ver vídeo de apresentação' : '▶ Watch overview video';
    return '<p class="card-video"><a href="' + MJ.esc(href) + '">' + MJ.esc(label) + '</a></p>';
  }

  MJ.renderGameCard = function (game) {
    var detail = MJ.url(MJ.gameHref(game.slug));
    return '<article class="card">' +
      MJ.renderCover(game, 'lazy', detail) +
      '<div class="card-body">' +
        '<h3 class="card-title"><a href="' + MJ.esc(detail) + '">' + MJ.esc(game.titulo) + '</a></h3>' +
        '<p class="card-text">' + MJ.esc(game.resumo) + '</p>' +
        MJ.renderPrice(game) +
        renderVideoShortcut(game) +
        '<div class="card-actions">' +
          '<a class="btn btn--ghost" href="' + MJ.esc(detail) + '">' + MJ.esc(MJ.t('details')) + '</a>' +
          '<a class="btn btn--primary" href="' + MJ.esc(game.kiwifyUrl) + '" target="_blank" rel="noopener noreferrer">' + MJ.esc(MJ.t('buy')) + '</a>' +
        '</div>' +
      '</div></article>';
  };
})();