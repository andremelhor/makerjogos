/* ==========================================================
   contact.js — monta os canais de contato (página Contato)
   a partir de js/config.js. Canal vazio = não aparece.
   ========================================================== */
(function () {
  var MJ = window.MJ;

  MJ.contactChannels = function () {
    var list = [];
    var cfg = MJ.config;
    if (cfg.whatsapp) {
      list.push({ label: 'WhatsApp', text: 'Chamar no WhatsApp', url: 'https://wa.me/' + String(cfg.whatsapp).replace(/\D/g, ''), external: true });
    }
    if (cfg.email) {
      list.push({ label: 'E-mail', text: cfg.email, url: 'mailto:' + cfg.email, external: false });
    }
    (cfg.social || []).forEach(function (s) {
      if (s.url) list.push({ label: s.label, text: 'Abrir ' + s.label, url: s.url, external: true });
    });
    return list;
  };

  MJ.renderContact = function (host) {
    var list = MJ.contactChannels();
    if (!list.length) {
      host.innerHTML = '<p>Canais de contato em breve.</p>';
      return;
    }
    host.innerHTML = '<ul class="contact-grid">' + list.map(function (ch) {
      var ext = ch.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<li><a class="contact-card" href="' + MJ.esc(ch.url) + '"' + ext + '>' +
        '<span class="contact-label">' + MJ.esc(ch.label) + '</span>' +
        '<span class="contact-text">' + MJ.esc(ch.text) + '</span></a></li>';
    }).join('') + '</ul>';
  };
})();
