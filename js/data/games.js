/* ==========================================================
   games.js — catálogo de jogos, nos dois idiomas.
   Para adicionar um jogo, copie um bloco inteiro, mude o slug e
   preencha os campos de cada idioma.

   Campos comuns (valem para os dois idiomas):
     slug      : identificador na URL (minúsculas, sem espaço/acento)
     destaque  : true = aparece na Home

   Campos por idioma (pt = site em português, en = site em inglês):
     titulo, imagens (lista com 1 até 5 fotos 1200x900 px em .webp/.jpg),
     resumo, descricao (lista de parágrafos), preco, precoDe,
     jogadores, duracao, idade, arquivo, incluso (lista), kiwifyUrl

   Um jogo SÓ aparece no site de um idioma se tiver o bloco desse idioma.
   Preço: pt em reais (BRL), en em dólares (USD).
   
   
      O que fazer: Crie uma pasta assets/img/games/pense-rapido/ e 
      salve lá dentro de 1 a 5 imagens horizontais (1200 × 900 px em .webp ou .jpg) — por exemplo,
    a capa centralizada sobre um fundo grafite/laranja (capa.webp) e fotos ou montagens das cartas na mesa (carta-1.webp, carta-2.webp).
   
   
   ========================================================== */





window.MJ = window.MJ || {};

MJ.games = [
  {
    slug: 'pense-rapido-x-math',
    destaque: true,

    pt: {

      titulo: 'Pense Rápido X-Math',
      videoUrl: 'https://www.youtube.com/watch?v=1EMKTLaxNak',
      imagens: [
        'assets/img/games/pense-rapido/pense-rapido-01.png'],
        // ...


      titulo: 'Pense Rápido X-Math',
      imagens: [
        'assets/img/games/pense-rapido/pense-rapido-01.png',
        'assets/img/games//pense-rapido/pense-rapido-02.png',
        'assets/img/games//pense-rapido/pense-rapido-03.png'
      ],
      resumo: 'Agilidade, cálculo mental e muita adrenalina: monte expressões matemáticas antes dos outros jogadores e bata na carta para vencer!',
      descricao: [
        'Pense Rápido X-Math é um jogo de agilidade e raciocínio lógico em que todos jogam ao mesmo tempo. A cada rodada, uma Carta de Missão revela uma restrição matemática obrigatória e dois dados definem o número-alvo (dezena e unidade).',
        'Usando seu próprio kit de fichas numéricas (1 a 9) e operadores (+, −, ×, ÷ e parênteses), você precisa montar uma expressão válida que resulte no alvo antes dos adversários, bater a mão sobre a carta e gritar "Resolvi!".',
        'Com cartas divididas em quatro níveis de desafio — Bronze (1 a 3 pts), Prata (3 pts), Ouro (5 pts) e Diamante (7 pts) — e a tensa penalidade do "Falso Tapa" para quem errar a conta, o jogo funciona tanto em família quanto em sala de aula.'
      ],
      preco: 29.9,
      precoDe: null,
      jogadores: '2 ou mais',
      duracao: '15 a 30 min',
      idade: '8+',
      arquivo: 'PDF para imprimir em A4',
      incluso: [
        'Kits de fichas de números (1 a 9) e operadores matemáticos',
        'Baralho completo de Cartas de Missão (Bronze, Prata, Ouro e Diamante)',
        'Manual oficial ilustrado com guia de cartas em PDF',
        'Verso personalizado Pense Rápido X-Math'
      ],
      kiwifyUrl: 'https://pay.kiwify.com.br/SEU-LINK-AQUI'
    }
  }

  /* ==========================================================
     MOLDE PARA PRÓXIMO JOGO (descomente e preencha quando quiser)
     ==========================================================
  ,
  {
    slug: 'nome-do-proximo-jogo',
    destaque: true,

    pt: {
      titulo: 'Nome do Próximo Jogo',
      imagens: [
        'assets/img/games/proximo-jogo/capa.webp'
      ],
      resumo: 'Texto curto de uma ou duas linhas que aparece no card do jogo.',
      descricao: [
        'Primeiro parágrafo da descrição completa do jogo.',
        'Segundo parágrafo explicando a mecânica e o diferencial.'
      ],
      preco: 39.9,
      precoDe: 49.9,
      jogadores: '2 a 6',
      duracao: '30 a 45 min',
      idade: '10+',
      arquivo: 'PDF para imprimir em A4',
      incluso: [
        'Tabuleiro e cartas prontos para impressão',
        'Livro de regras em PDF'
      ],
      kiwifyUrl: 'https://pay.kiwify.com.br/SEU-LINK-AQUI'
    },

    en: {
      titulo: 'Next Game Name',
      imagens: [
        'assets/img/games/proximo-jogo/cover-en.webp'
      ],
      resumo: 'Short one or two line summary shown on the game card.',
      descricao: [
        'First paragraph of the full game description.'
      ],
      preco: 7.99,
      precoDe: null,
      jogadores: '2 to 6',
      duracao: '30 to 45 min',
      idade: '10+',
      arquivo: 'Print-ready PDF (A4)',
      incluso: [
        'Board and cards ready to print',
        'Rulebook (PDF)'
      ],
      kiwifyUrl: 'https://itch.io/SEU-LINK-AQUI'
    }
  }
  */
];