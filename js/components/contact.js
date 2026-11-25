/* ==========================================================
   contact.js — monta os canais de contato (página Contact/Contato)
   a partir de js/config.js. Canal vazio = não aparece.
   ========================================================== */
(function () {
  var MJ = window.MJ;

  MJ.contactChannels = function () {
    var list = [];
    var cfg = MJ.config;
    var lang = MJ.lang();

    if (cfg.whatsapp) {
      list.push({ label: 'WhatsApp', text: MJ.t('whatsappText'), url: 'https://wa.me/' + String(cfg.whatsapp).replace(/\D/g, ''), external: true });
    }
    if (cfg.email) {
      list.push({ label: 'E-mail', text: cfg.email, url: 'mailto:' + cfg.email, external: false });
    }

    var rawSocial = cfg.social || [];
    var socialList = Array.isArray(rawSocial) ? rawSocial : (rawSocial[lang] || rawSocial.en || []);

    socialList.forEach(function (s) {
      if (s.url) list.push({ label: s.label, text: MJ.t('openText', { x: s.label }), url: s.url, external: true });
    });
    return list;
  };

  MJ.renderContact = function (host) {
    var list = MJ.contactChannels();
    if (!list.length) {
      host.innerHTML = '<p>' + MJ.esc(MJ.t('noChannels')) + '</p>';
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