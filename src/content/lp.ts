/**
 * Copy + catálogo da landing "Fé em Crochê — Santinhas de Crochê".
 * Fonte única: semeada no banco (prisma/seed.ts) para o admin editar e usada como FALLBACK na render.
 * NÃO importa nada interno (@/...) — é importado pela app (@/content/lp) e pelo seed (../src/content/lp).
 *
 * Regra: nada é inventado. Depoimentos, nº de artesãs e história da autora vão como // TODO.
 */

export type LpSection = {
  key: string;
  type: string;
  label: string;
  title?: string;
  subtitle?: string;
  body?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  config?: Record<string, unknown>;
};

// ───────────── Coleção: 20 desenhos (10 santas + 10 santos) ─────────────
export const LP_SANTAS = [
  "Nossa Senhora Aparecida",
  "Nossa Senhora de Fátima",
  "Nossa Senhora das Graças",
  "Nossa Senhora Rainha",
  "Santa Teresinha",
  "Santa Joana d'Arc",
  "Santa Rosa",
  "Santa Cecília",
  "Santa Luzia",
  "Santa Rita",
];
export const LP_SANTOS = [
  "São José",
  "Santo Antônio",
  "São Francisco",
  "São Jorge",
  "São Pedro",
  "São Paulo",
  "São Bento",
  "São Sebastião",
  "São João Batista",
  "São Judas Tadeu",
];

// ───────────── Seções da landing ─────────────
export const LP_SECTIONS: LpSection[] = [
  {
    key: "hero",
    type: "hero",
    label: "Hero",
    title: "Na próxima tarde, a agulha na sua mão pode estar fazendo uma santa.",
    subtitle: "20 receitas em PDF — 10 santas e 10 santos —, os novelos que você escolher e a sua devoção em cada ponto.",
    ctaLabel: "Escolher meu pacote",
    ctaTarget: "#oferta",
    config: {
      eyebrow: "Santinhas de Crochê · receitas de amigurumi",
      trust: "Com 50% de desconto · a partir de R$ 19,90 · PDF no e-mail · 7 dias de garantia",
    },
  },
  {
    key: "dor",
    type: "product_in_use",
    label: "Dor — Já aconteceu com você?",
    title: "Já aconteceu com você?",
    body: "Você senta com a linha na mão, cheia de vontade de fazer uma Nossa Senhora, e vai procurar como faz. Acha mil vídeos, cada um de um jeito, a moça fala rápido e corta justo na hora de montar. Aí você desmancha, refaz, desmancha de novo… e guarda tudo com aquela pontinha de raiva. Não é que você não sabe crochê. É que ninguém nunca te deu o gráfico certo, com cada parte explicada.",
  },
  {
    key: "conteudo",
    type: "benefits",
    label: "O que você recebe",
    title: "A receita por dentro",
    subtitle:
      "Cada santinha vem com o corpo e as peças separados. De cada peça você recebe a foto de como fica pronta, o gráfico e as cores do fio — e a legenda dos pontos. Abre no celular e fica do lado da sua poltrona, ou imprime em A4.",
    config: {
      items: [
        { icon: "grid", title: "O gráfico desenhado parte por parte", text: "Cabeça, manto, base — cada peça da santinha no gráfico." },
        { icon: "palette", title: "A lista de material", text: "Qual linha, qual agulha e as cores do fio de cada peça." },
        { icon: "check", title: "O passo a passo de montagem", text: "A ordem certa de juntar tudo, sem adivinhação." },
      ],
    },
  },
  {
    key: "pecas",
    type: "product_in_use",
    label: "Folha das peças (gráficos)",
    title: "A folha real das peças de cada santinha",
    subtitle: "Exemplo: Santa Teresinha — cada uma das sete peças com a foto de como fica pronta, o gráfico e as cores do fio. Embaixo, a legenda dos pontos.",
    body: "",
    config: {
      image: "/img/pecas-folha.svg",
      pieces: [
        "Auréola florida",
        "Véu preto e branco",
        "Manto com rosas",
        "Túnica marrom",
        "Buquê de rosas",
        "Crucifixo",
        "Terço dourado",
        "Legenda dos pontos",
      ],
    },
  },
  {
    key: "livro",
    type: "benefits",
    label: "Livro de receitas (150 páginas)",
    title: "A receita escrita, carreira por carreira, para você não perder a conta.",
    subtitle:
      "No Pacote Completo: o livro de receitas tem 150 páginas. Começa pela base que todas as santinhas usam (corpo, cabeça, braços e cabelo) e depois traz um capítulo para cada santa, com as cores, as roupas, os acessórios e a ordem de montagem.",
    config: {
      image: "/img/livro-paginas.svg",
      items: [
        { icon: "palette", title: "Materiais e linha por cor", text: "Linha, agulha, enchimento e olhos, e quantos gramas de cada cor separar." },
        { icon: "grid", title: "Carreira por carreira", text: "O que fazer em cada carreira e o total de pontos no fim dela." },
        { icon: "check", title: "Legenda dos pontos", text: "Anel mágico, ponto baixo, aumento, diminuição, ponto pipoca — cada sigla explicada." },
        { icon: "star", title: "Montagem em ordem", text: "Onde costurar braços, manto, coroa e flores para a santa ficar de pé e simétrica." },
        { icon: "heart", title: "Ajustes e soluções", text: "O que fazer se o fundo ondular, se o enchimento aparecer ou se o manto arrastar." },
        { icon: "gift", title: "As peças ampliadas", text: "Uma prancha por santa, com a foto de cada peça pronta ao lado do gráfico: 60 peças ao todo." },
      ],
    },
  },
  {
    key: "destino",
    type: "product_in_use",
    label: "Para quem você vai fazer",
    title: "Cada santinha já nasce com destino certo.",
    subtitle: "",
    config: {
      image: "/img/colecao-santinhas.svg",
      cards: [
        { label: "Para a neta", quote: "“Vó, essa é a santa do meu nome?”", text: "Rita, Luzia, Cecília, Rosa, Joana, Teresinha: dá para começar pela santa que tem o nome dela." },
        { label: "Para a primeira comunhão ou o batizado", quote: "“Foi a minha madrinha que fez.”", text: "Um presente que fica anos no quarto da criança e tem uma história para contar." },
        { label: "Para o oratório", quote: "“Agora Nossa Senhora mora aqui.”", text: "Aparecida, Fátima, das Graças ou Rainha: quatro títulos de Maria para o seu cantinho de oração." },
        { label: "Para a catequese", quote: "“Tia, posso segurar a Joana d'Arc?”", text: "Com a santinha na mão, a história dela fica na memória das crianças." },
      ],
    },
  },
  {
    key: "colecao",
    type: "product_in_use",
    label: "A coleção (20 desenhos)",
    title: "As 20 receitas da coleção",
    subtitle: "10 santas e 10 santos — comece pela devoção da sua casa.",
    config: { santas: LP_SANTAS, santos: LP_SANTOS },
  },
  {
    key: "diferencial",
    type: "product_in_use",
    label: "Diferencial",
    title: "Por que aqui é diferente",
    body: 'A maioria vende uma foto bonita e te deixa adivinhar como se chega naquilo. Aqui não. Cada peça vem destrinchada: você vê onde começa, onde aumenta e onde arremata. É quase como ter alguém do seu lado dizendo "agora faz isso".',
    config: { imageUrl: "/img/maos-crochetando.svg" },
  },
  {
    key: "reviews",
    type: "reviews",
    label: "Prova social (depoimentos reais)",
    title: "O que as artesãs estão dizendo",
    subtitle: "",
  },
  {
    key: "autora",
    type: "product_in_use",
    label: "Autora",
    title: "Quem fez essa coleção",
    body: "[A SER PREENCHIDO PELA AUTORA] Escreva aqui, em primeira pessoa, quem você é, há quanto tempo crocheta e o que a fé e o crochê significam pra você. Uns 3 ou 4 parágrafos curtos, do seu jeito de falar, deixam esta parte verdadeira — e é isso que aproxima quem está lendo.",
    config: { imageUrl: "/img/autora.svg" },
  },
  {
    key: "oferta",
    type: "offer",
    label: "Oferta (pacotes)",
    title: "Escolha o seu pacote",
    subtitle: "Produto digital: você recebe os PDFs por e-mail. Acesso vitalício, imprima quantas vezes quiser.",
    config: {},
  },
  {
    key: "garantia",
    type: "product_in_use",
    label: "Garantia",
    title: "Sem risco pra você",
    body: "Você tem 7 dias de garantia. Se abrir e sentir que não é pra você, é só mandar uma mensagem que eu devolvo o valor integral. Simples assim.",
  },
  { key: "faq", type: "faq", label: "FAQ", title: "Perguntas frequentes" },
  {
    key: "fechamento",
    type: "final_cta",
    label: "Fechamento",
    title: "A sua primeira santinha pode estar pronta ainda esta semana.",
    subtitle: "Na sua mão, no seu cantinho de oração, ou no colo de quem você ama. Começa por ela hoje.",
    ctaLabel: "Escolher meu pacote",
    ctaTarget: "#oferta",
  },
];

export const LP_FAQ: { question: string; answer: string }[] = [
  { question: "Preciso saber crochê?", answer: "Sim, o básico — ponto baixo e ponto alto. Não é curso do zero, é a coleção de gráficos." },
  { question: "Qual a diferença entre o Básico e o Completo?", answer: "O Básico traz as 20 receitas em gráfico (foto, gráfico e cores de cada peça). O Completo traz tudo isso + o livro escrito de 150 páginas (carreira por carreira), a lista de materiais, a legenda, a montagem em ordem, as 60 peças ampliadas e 3 bônus." },
  { question: "Leio gráfico devagar, dou conta?", answer: "Dá. O material explica a legenda e vai peça por peça. No Completo ainda tem a receita escrita carreira por carreira." },
  { question: "Como recebo?", answer: "É digital. Assim que o PIX confirma, o acesso cai no seu e-mail (celular, tablet ou computador). Nada é enviado pelo correio." },
  { question: "Posso vender as peças que eu fizer?", answer: "Pode. Os gráficos são pra você fazer e vender as suas peças. Só não pode revender o PDF." },
  { question: "E se não for pra mim?", answer: "7 dias de garantia, devolvo o valor." },
];

// ───────────── Catálogo: 2 pacotes + 3 order bumps + upsell ─────────────
// priceCents = preço real cobrado (já com o desconto). compareAtPriceCents = âncora (2×) para a roleta "revelar" 50%.

export const LP_PACKAGES = [
  {
    slug: "pacote-basico",
    sku: "FC-BASICO",
    name: "Pacote Básico",
    tagline: "Para quem já lê gráfico",
    priceCents: 1990,
    compareAtCents: 3980,
    shortDescription: "As 20 receitas em gráfico (10 santas e 10 santos), com foto, gráfico e cores de cada peça.",
    features: [
      "20 receitas em gráfico de santinhas de amigurumi",
      "10 santas e 10 santos (4 títulos de Nossa Senhora + 6 santas + 10 santos)",
      "De cada peça: foto de como fica pronta, o gráfico e as cores do fio",
      "Acesso vitalício · imprima quantas vezes quiser",
    ],
    excludes: "Não inclui o livro com o passo a passo escrito, a lista de materiais nem os bônus.",
  },
  {
    slug: "pacote-completo",
    sku: "FC-COMPLETO",
    name: "Pacote Completo",
    tagline: "Para fazer do primeiro ao último ponto",
    badge: "RECEITA COMPLETA + 3 BÔNUS",
    priceCents: 2990,
    compareAtCents: 5980,
    featured: true,
    shortDescription: "Tudo do Básico + o livro escrito de 150 páginas, materiais, montagem, 60 peças ampliadas e 3 bônus.",
    features: [
      "Tudo do Básico: as 20 receitas em gráfico",
      "Livro de receitas completas, 150 páginas: cada santa escrita carreira por carreira, com o total de pontos",
      "Lista de materiais e quantos gramas de linha separar de cada cor",
      "Legenda dos pontos, ordem de montagem e guia de ajustes",
      "60 peças ampliadas, com a foto ao lado do gráfico",
    ],
    bonuses: [
      "Livrinho Conhecendo as Santas em Crochê, para ler em família",
      "Cartões de pequenos gestos: uma virtude e uma pergunta para o dia",
      "Marca-página das santinhas",
    ],
  },
];

// Produtos dos bumps/upsell (ativos para o checkout cotar; a LP não lista catálogo).
export const LP_BUMP_PRODUCTS = [
  { slug: "bump-livro-completo", sku: "FC-BUMP-LIVRO", name: "Livro de receitas completas + 3 bônus", priceCents: 700, shortDescription: "Livro de 150 páginas (carreira por carreira), lista de materiais e 3 bônus." },
  { slug: "bump-arcanjos", sku: "FC-BUMP-ARCANJOS", name: "3 arcanjos de crochê", priceCents: 790, shortDescription: "Receitas de São Gabriel, São Miguel e São Rafael, com materiais e montagem." },
  { slug: "bump-presepio", sku: "FC-BUMP-PRESEPIO", name: "Presépio de Natal em crochê", priceCents: 1190, shortDescription: "Presépio completo com 13 peças (Maria, José, Menino Jesus, Reis Magos e mais)." },
];

export const LP_BUMPS = [
  {
    name: "Livro de receitas completas + 3 bônus",
    productSlug: "bump-livro-completo",
    title: "Leve o livro de receitas completas, com lista de material + 3 bônus",
    description: "150 páginas, cada santa escrita carreira por carreira, lista de materiais e os 3 bônus (livrinho, cartões e marca-página).",
    benefit: "Por R$ 7,00",
    imageUrl: "/img/bump-livro-completo.svg",
    priceCents: 700,
    sortOrder: 1,
    // Só faz sentido para quem leva o Básico (o Completo já inclui)
    triggerSlugs: ["pacote-basico"],
  },
  {
    name: "3 arcanjos de crochê",
    productSlug: "bump-arcanjos",
    title: "Leve também a receita dos 3 arcanjos de crochê",
    description: "São Gabriel, São Miguel e São Rafael, com os materiais e a ordem de montagem.",
    benefit: "Por R$ 7,90",
    imageUrl: "/img/bump-arcanjos.svg",
    priceCents: 790,
    sortOrder: 2,
    triggerSlugs: ["pacote-basico", "pacote-completo"],
  },
  {
    name: "Presépio de Natal em crochê",
    productSlug: "bump-presepio",
    title: "Leve o Presépio de Natal em crochê",
    description: "O presépio completo com 13 peças: Maria, José, Menino Jesus, o anjo, os pastores, os 3 Reis Magos e a Estrela de Belém.",
    benefit: "Por R$ 11,90",
    imageUrl: "/img/bump-presepio.svg",
    priceCents: 1190,
    sortOrder: 3,
    triggerSlugs: ["pacote-basico", "pacote-completo"],
  },
];

export const LP_UPSELL_PRODUCT = {
  slug: "upsell-calendario",
  sku: "FC-UP-CALENDARIO",
  name: "Calendário do Crochê Devocional",
  priceCents: 2700,
  shortDescription: "Uma peça nova por mês, o ano inteiro.",
};

export const LP_UPSELL = {
  name: "Calendário do Crochê Devocional",
  productSlug: "upsell-calendario",
  headline: "Já que você começou, leve o ano inteiro",
  title: "Calendário do Crochê Devocional: uma peça nova por mês",
  description: "A cada mês, um gráfico novo de uma santinha ou peça devocional pra você fazer, presentear e vender. O ano todo com ideia na mão.",
  priceCents: 2700,
  sortOrder: 1,
};

// Desconto da roleta (sempre 50%). A roleta "revela" e os preços exibidos caem do âncora para o real.
export const WHEEL_DISCOUNT_PERCENT = 50;
