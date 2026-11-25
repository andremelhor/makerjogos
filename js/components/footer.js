/* ==========================================================
   footer.js — gera o rodapé e o injeta em <div id="site-footer"></div>
   ========================================================== */
(function () {
  var MJ = window.MJ;

  MJ.renderFooter = function () {
    var host = document.getElementById('site-footer');
    if (!host) return;

    var links = MJ.menu.map(function (item) {
      return '<li><a href="' + MJ.esc(MJ.url(item.href)) + '">' + MJ.esc(item.label) + '</a></li>';
    }).join('');

    var social = (MJ.config.social || []).filter(function (s) { return s.url; }).map(function (s) {
      return '<li><a href="' + MJ.esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + MJ.esc(s.label) + '</a></li>';
    }).join('');

    var whats = MJ.config.whatsapp
      ? '<li><a href="https://wa.me/' + MJ.esc(String(MJ.config.whatsapp).replace(/\D/g, '')) + '" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>'
      : '';

    var email = MJ.config.email
      ? '<li><a href="mailto:' + MJ.esc(MJ.config.email) + '">' + MJ.esc(MJ.config.email) + '</a></li>'
      : '';

    var socialBlock = (social || email || whats)
      ? '<div><h2 class="footer-title">Fale com a gente</h2><ul class="footer-list">' + social + whats + email + '</ul></div>'
      : '';

    host.innerHTML =
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div><a class="footer-logo" href="' + MJ.esc(MJ.url('index.html')) + '">' +
            '<img src="' + MJ.esc(MJ.url(MJ.config.logo)) + '" alt="' + MJ.esc(MJ.config.siteName) + '" width="132" height="52" loading="lazy"></a>' +
            '<p class="footer-text">' + MJ.esc(MJ.config.tagline) + '.</p></div>' +
          '<div><h2 class="footer-title">Navegação</h2><ul class="footer-list">' + links + '</ul></div>' +
          socialBlock +
        '</div>' +
        '<p class="footer-legal">© ' + new Date().getFullYear() + ' ' + MJ.esc(MJ.config.siteName) +
        '. Produtos digitais para impressão; nenhum item físico é enviado.</p>' +
      '</div></footer>';
  };
})();
