/* ==========================================================
   menu.js — ÚNICO lugar para editar o menu do site.
   Header e footer leem este arquivo em todas as páginas.

   - href é sempre relativo à RAIZ do site (sem "../").
   - children: lista de submenus, ou '@games' para listar
     automaticamente todos os jogos de games.js.
   ========================================================== */
window.MJ = window.MJ || {};

MJ.menu = [
  { label: 'Início', href: 'index.html' },

  { label: 'Jogos', href: 'jogos/index.html', children: '@games' },

  {
    label: 'Como funciona',
    href: 'como-funciona.html',
    children: [
      { label: 'O que é Print & Play', href: 'como-funciona.html#o-que-e-pnp' },
      { label: 'Como comprar', href: 'como-funciona.html#como-comprar' },
      { label: 'Como imprimir', href: 'como-funciona.html#como-imprimir' },
      { label: 'Como montar e jogar', href: 'como-funciona.html#como-montar' }
    ]
  },

  { label: 'Sobre', href: 'sobre.html' },
  { label: 'Contato', href: 'contato.html' }
];
