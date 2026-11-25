/* ==========================================================
   footer.js — gera o rodapé e o injeta em <div id="site-footer"></div>
   ========================================================== */
(function () {
  var MJ = window.MJ;

  MJ.renderFooter = function () {
    var host = document.getElementById('site-footer');
    if (!host) return;

    var lang = MJ.lang();
    var menu = MJ.menu[lang] || MJ.menu.en;
    var links = menu.map(function (item) {
      var path = item.href || MJ.route(item.page);
      return '<li><a href="' + MJ.esc(MJ.url(path)) + '">' + MJ.esc(item.label) + '</a></li>';
    }).join('');

    // Lê as redes sociais do idioma atual (ou array direto, se configurado assim)
    var rawSocial = MJ.config.social || [];
    var socialList = Array.isArray(rawSocial) ? rawSocial : (rawSocial[lang] || rawSocial.en || []);

    var social = socialList.filter(function (s) { return s.url; }).map(function (s) {
      return '<li><a href="' + MJ.esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + MJ.esc(s.label) + '</a></li>';
    }).join('');

    var whats = MJ.config.whatsapp
      ? '<li><a href="https://wa.me/' + MJ.esc(String(MJ.config.whatsapp).replace(/\D/g, '')) + '" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>'
      : '';

    var email = MJ.config.email
      ? '<li><a href="mailto:' + MJ.esc(MJ.config.email) + '">' + MJ.esc(MJ.config.email) + '</a></li>'
      : '';

    var contactBlock = (social || email || whats)
      ? '<div><h2 class="footer-title">' + MJ.esc(MJ.t('footerContact')) + '</h2><ul class="footer-list">' + social + whats + email + '</ul></div>'
      : '';

    host.innerHTML =
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div><a class="footer-logo" href="' + MJ.esc(MJ.homeUrl()) + '">' +
            '<img src="' + MJ.esc(MJ.url(MJ.config.logo)) + '" alt="' + MJ.esc(MJ.config.siteName) + '" width="132" height="52" loading="lazy"></a>' +
            '<p class="footer-text">' + MJ.esc(MJ.t('tagline')) + '</p></div>' +
          '<div><h2 class="footer-title">' + MJ.esc(MJ.t('footerNav')) + '</h2><ul class="footer-list">' + links + '</ul></div>' +
          contactBlock +
        '</div>' +
        '<p class="footer-legal">© ' + new Date().getFullYear() + ' ' + MJ.esc(MJ.config.siteName) + '. ' + MJ.esc(MJ.t('footerLegal')) + '</p>' +
      '</div></footer>';
  };
})();