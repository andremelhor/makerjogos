/* ==========================================================
   games.js — catálogo de jogos. Para adicionar um jogo,
   copie um bloco, mude o slug e preencha os campos.

   slug       : identificador na URL (minúsculas, sem espaço/acento)
   capa       : caminho a partir da raiz, ex.: 'assets/img/games/meu-jogo/capa.jpg'
                (null = mostra um bloco de cor no lugar)
   galeria    : lista de imagens (mesmo formato de capa)
   kiwifyUrl  : link de checkout do produto na Kiwify
   destaque   : true = aparece na Home
   ========================================================== */
window.MJ = window.MJ || {};

MJ.games = [
  {
    slug: 'jogo-exemplo-1',
    titulo: 'Jogo Exemplo 1',
    resumo: 'Texto curto de uma ou duas linhas que aparece no card do jogo.',
    descricao: [
      'EXEMPLO: primeiro parágrafo da descrição completa do jogo.',
      'EXEMPLO: segundo parágrafo. Explique a proposta, o tema e o que torna o jogo especial.'
    ],
    preco: 29.9,
    precoDe: null,
    capa: null,
    galeria: [],
    jogadores: '2 a 4',
    duracao: '30 a 45 min',
    idade: '10+',
    arquivo: 'PDF para imprimir em A4',
    incluso: [
      'Tabuleiro e cartas prontos para impressão',
      'Livro de regras em PDF',
      'Guia de montagem'
    ],
    kiwifyUrl: 'https://pay.kiwify.com.br/SEU-LINK-AQUI',
    destaque: true
  },
  {
    slug: 'jogo-exemplo-2',
    titulo: 'Jogo Exemplo 2',
    resumo: 'Outro texto curto de exemplo para o card do segundo jogo.',
    descricao: [
      'EXEMPLO: descrição completa do segundo jogo.'
    ],
    preco: 39.9,
    precoDe: 49.9,
    capa: null,
    galeria: [],
    jogadores: '3 a 6',
    duracao: '20 a 30 min',
    idade: '12+',
    arquivo: 'PDF para imprimir em A4',
    incluso: [
      'Cartas prontas para impressão',
      'Livro de regras em PDF'
    ],
    kiwifyUrl: 'https://pay.kiwify.com.br/SEU-LINK-AQUI',
    destaque: true
  }
];
