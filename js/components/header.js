/* ==========================================================
   header.js — gera o cabeçalho a partir de MJ.menu[idioma] e o injeta
   em <div id="site-header"></div>. Controla dropdown, menu mobile
   e o seletor de idioma.
   ========================================================== */
(function () {
  var MJ = window.MJ;

  /* Normaliza caminhos para comparar a página atual com cada link */
  function normalize(pathname) {
    return pathname.charAt(pathname.length - 1) === '/' ? pathname + 'index.html' : pathname;
  }

  function isActive(path) {
    var clean = path.split('#')[0];
    var url = new URL(MJ.url(clean), window.location.href);
    if (normalize(url.pathname) !== normalize(window.location.pathname)) return false;
    return url.search ? url.search === window.location.search : true;
  }

  /* Caminho (a partir da raiz) de um item do menu */
  function itemPath(item) {
    return item.href || (MJ.route(item.page) + (item.hash ? '#' + item.hash : ''));
  }

  function getChildren(item) {
    if (item.children === '@games') {
      var list = [{ label: MJ.t('allGames'), path: MJ.route('games') }];
      MJ.localGames().forEach(function (g) {
        list.push({ label: g.titulo, path: MJ.gameHref(g.slug) });
      });
      return list;
    }
    if (!item.children) return null;
    return item.children.map(function (c) { return { label: c.label, path: itemPath(c) }; });
  }

  function renderItem(item) {
    var path = itemPath(item);
    var children = getChildren(item);
    var active = isActive(path) || (children && children.some(function (c) { return isActive(c.path); }));
    var current = active ? ' aria-current="page"' : '';
    var link = '<a class="nav-link' + (active ? ' is-active' : '') + '" href="' + MJ.esc(MJ.url(path)) + '"' + current + '>' + MJ.esc(item.label) + '</a>';

    if (!children) {
      return '<li class="nav-item">' + link + '</li>';
    }

    var subs = children.map(function (c) {
      return '<li><a class="submenu-link" href="' + MJ.esc(MJ.url(c.path)) + '">' + MJ.esc(c.label) + '</a></li>';
    }).join('');

    return '<li class="nav-item has-sub">' + link +
      '<button type="button" class="sub-toggle" aria-expanded="false" aria-label="' + MJ.esc(MJ.t('submenuOpen', { x: item.label })) + '"></button>' +
      '<ul class="submenu">' + subs + '</ul></li>';
  }

  /* Seletor de idioma: exibe ambas as bandeiras (EN e PT) fixas no cabeçalho.
     O idioma atual recebe destaque visual (borda laranja) e o outro leva à página equivalente. */
  function renderLanguages() {
    var langs = MJ.config.languages || [];
    if (langs.length < 2) return '';
    var here = MJ.lang();

    var items = langs.map(function (l) {
      var flag = '<img src="' + MJ.esc(MJ.url(l.flag)) + '" alt="" width="22" height="16">';
      var code = '<span class="lang-code">' + MJ.esc(l.short) + '</span>';

      if (l.code === here) {
        return '<li><span class="lang-item is-active" aria-current="true" title="' + MJ.esc(l.label) + '">' + flag + code + '</span></li>';
      }  

      return '<li><a class="lang-item" href="' + MJ.esc(MJ.altUrl(l.code)) + '" lang="' + MJ.esc(l.code) + '" hreflang="' + MJ.esc(l.code) + '"' +
        ' aria-label="' + MJ.esc(l.label) + ' (' + MJ.esc(l.short) + ')" title="' + MJ.esc(l.label) + '">' + flag + code + '</a></li>';
    }).join('');

    return '<ul class="lang-switch" aria-label="' + MJ.esc(MJ.t('language')) + '">' + items + '</ul>';
  }


  // ANULA O LINK DA LINGUA EM INGLES 
  // function renderLanguages() {
  //   var langs = MJ.config.languages || [];
  //   if (langs.length < 2) return '';
  //   var here = MJ.lang();

  //   var items = langs.map(function (l) {
  //     var flag = '<img src="' + MJ.esc(MJ.url(l.flag)) + '" alt="" width="22" height="16">';
  //     var code = '<span class="lang-code">' + MJ.esc(l.short) + '</span>';

  //     if (l.code === here) {
  //       return '<li><span class="lang-item is-active" aria-current="true" title="' + MJ.esc(l.label) + '">' + flag + code + '</span></li>';
  //     }

  //     var href = l.code === 'en' ? '#' : MJ.esc(MJ.altUrl(l.code));
  //     return '<li><a class="lang-item" href="' + href + '" lang="' + MJ.esc(l.code) + '" hreflang="' + MJ.esc(l.code) + '"' +
  //       ' aria-label="' + MJ.esc(l.label) + ' (' + MJ.esc(l.short) + ')" title="' + MJ.esc(l.label) + '">' + flag + code + '</a></li>';
  //   }).join('');

  //   return '<ul class="lang-switch" aria-label="' + MJ.esc(MJ.t('language')) + '">' + items + '</ul>';
  // }

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
      burger.setAttribute('aria-label', open ? MJ.t('menuClose') : MJ.t('menuOpen'));
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
        burger.setAttribute('aria-label', MJ.t('menuOpen'));
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

    var menu = MJ.menu[MJ.lang()] || MJ.menu.en;

    host.innerHTML =
      '<a class="skip-link" href="#main">' + MJ.esc(MJ.t('skip')) + '</a>' +
      '<header class="site-header"><div class="container header-inner">' +
        '<a class="brand" href="' + MJ.esc(MJ.homeUrl()) + '" aria-label="' + MJ.esc(MJ.t('homeAria', { x: MJ.config.siteName })) + '">' +
          '<img class="brand-logo" src="' + MJ.esc(MJ.url(MJ.config.logo)) + '" alt="' + MJ.esc(MJ.config.siteName) + '" width="121" height="48">' +
        '</a>' +
        '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="' + MJ.esc(MJ.t('menuOpen')) + '"><span></span></button>' +
        '<nav id="site-nav" class="site-nav" aria-label="' + MJ.esc(MJ.t('navMain')) + '"><ul class="nav-list">' +
          menu.map(renderItem).join('') +
        '</ul>' + renderLanguages() + '</nav>' +
      '</div></header>';

    bind(host);
  };
})();