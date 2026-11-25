/* ==========================================================
   menu.js — ÚNICO lugar para editar o menu do site.
   Header e footer leem este arquivo em todas as páginas.

   Cada idioma tem o seu menu (en e pt).
   - page: nome da página, definido em config.js > routes
           (home, games, how, about, contact)
   - hash: trecho da página (sem #), opcional
   - href: caminho a partir da raiz, para links fora do padrão
   - children: lista de submenus, ou '@games' para listar
               automaticamente os jogos de games.js
   ========================================================== */
window.MJ = window.MJ || {};

MJ.menu = {
  en: [
    { label: 'Home', page: 'home' },
    { label: 'Games', page: 'games', children: '@games' },
    {
      label: 'How it works',
      page: 'how',
      children: [
        { label: 'What is Print & Play', page: 'how', hash: 'what-is-pnp' },
        { label: 'How to buy', page: 'how', hash: 'how-to-buy' },
        { label: 'How to print', page: 'how', hash: 'how-to-print' },
        { label: 'How to build and play', page: 'how', hash: 'how-to-play' }
      ]
    },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ],

  pt: [
    { label: 'Início', page: 'home' },
    { label: 'Jogos', page: 'games', children: '@games' },
    {
      label: 'Como funciona',
      page: 'how',
      children: [
        { label: 'O que é Print & Play', page: 'how', hash: 'o-que-e-pnp' },
        { label: 'Como comprar', page: 'how', hash: 'como-comprar' },
        { label: 'Como imprimir', page: 'how', hash: 'como-imprimir' },
        { label: 'Como montar e jogar', page: 'how', hash: 'como-montar' }
      ]
    },
    { label: 'Sobre', page: 'about' },
    { label: 'Contato', page: 'contact' }
  ]
};
