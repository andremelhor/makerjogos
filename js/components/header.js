/* ==========================================================
   header.js — gera o cabeçalho a partir de MJ.menu e o injeta
   em <div id="site-header"></div>. Controla dropdown e menu mobile.
   ========================================================== */
(function () {
  var MJ = window.MJ;

  /* Normaliza caminhos para comparar a página atual com cada link */
  function normalize(pathname) {
    return pathname.charAt(pathname.length - 1) === '/' ? pathname + 'index.html' : pathname;
  }

  function isActive(href) {
    var clean = href.split('#')[0];
    var url = new URL(MJ.url(clean), window.location.href);
    if (normalize(url.pathname) !== normalize(window.location.pathname)) return false;
    return url.search ? url.search === window.location.search : true;
  }

  function getChildren(item) {
    if (item.children === '@games') {
      var list = [{ label: 'Todos os jogos', href: 'jogos/index.html' }];
      (MJ.games || []).forEach(function (g) {
        list.push({ label: g.titulo, href: 'jogos/jogo.html?jogo=' + encodeURIComponent(g.slug) });
      });
      return list;
    }
    return item.children || null;
  }

  function renderItem(item) {
    var children = getChildren(item);
    var active = isActive(item.href) || (children && children.some(function (c) { return isActive(c.href); }));
    var current = active ? ' aria-current="page"' : '';
    var link = '<a class="nav-link' + (active ? ' is-active' : '') + '" href="' + MJ.esc(MJ.url(item.href)) + '"' + current + '>' + MJ.esc(item.label) + '</a>';

    if (!children) {
      return '<li class="nav-item">' + link + '</li>';
    }

    var subs = children.map(function (c) {
      return '<li><a class="submenu-link" href="' + MJ.esc(MJ.url(c.href)) + '">' + MJ.esc(c.label) + '</a></li>';
    }).join('');

    return '<li class="nav-item has-sub">' + link +
      '<button type="button" class="sub-toggle" aria-expanded="false" aria-label="Abrir submenu de ' + MJ.esc(item.label) + '"></button>' +
      '<ul class="submenu">' + subs + '</ul></li>';
  }

  function canHover() {
    return window.matchMedia('(hover: hover) and (min-width: 900px)').matches;
  }

  function closeAllSubs(root) {
    root.querySelectorAll('.has-sub.open').forEach(function (li) {
      li.classList.remove('open');
      li.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
    });
  }

  function bind(host) {
    var nav = host.querySelector('.site-nav');
    var burger = host.querySelector('.nav-toggle');

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      if (!open) closeAllSubs(host);
    });

    host.querySelectorAll('.sub-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (canHover()) return; // no desktop com mouse, o hover já cuida
        var li = btn.parentElement;
        var willOpen = !li.classList.contains('open');
        closeAllSubs(host);
        li.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
      });
    });

    document.addEventListener('click', function (e) {
      if (!host.contains(e.target)) {
        closeAllSubs(host);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeAllSubs(host);
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu');
        burger.focus();
      }
    });

    window.matchMedia('(min-width: 900px)').addEventListener('change', function () {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      closeAllSubs(host);
    });
  }

  MJ.renderHeader = function () {
    var host = document.getElementById('site-header');
    if (!host) return;

    host.innerHTML =
      '<a class="skip-link" href="#main">Pular para o conteúdo</a>' +
      '<header class="site-header"><div class="container header-inner">' +
        '<a class="brand" href="' + MJ.esc(MJ.url('index.html')) + '" aria-label="' + MJ.esc(MJ.config.siteName) + ' — página inicial">' +
          '<img class="brand-logo" src="' + MJ.esc(MJ.url(MJ.config.logo)) + '" alt="' + MJ.esc(MJ.config.siteName) + '" width="121" height="48">' +
        '</a>' +
        '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menu"><span></span></button>' +
        '<nav id="site-nav" class="site-nav" aria-label="Principal"><ul class="nav-list">' +
          MJ.menu.map(renderItem).join('') +
        '</ul></nav>' +
      '</div></header>';

    bind(host);
  };
})();
