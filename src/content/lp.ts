/**
 * Copy + catálogo da landing "Fé em Crochê — Santinhas de Crochê".
 * Fonte única: semeada no banco (prisma/seed.ts) e usada como FALLBACK na render.
 * NÃO importa nada interno (@/...).
 *
 * IMAGENS: as santas usam imagens por LINK (editáveis no admin/config). Os URLs padrão abaixo
 * apontam para o site de referência enquanto o dono não sobe as próprias (trocar por link no admin).
 * Regra: nada é inventado. Depoimentos, autora e atributos dos SANTOS vão como // TODO (preencher).
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

export type SaintCard = { n: number; name: string; title: string; attrs: string; img: string };

// ───────────── Coleção: 10 santas (com imagens do site de referência, por link) ─────────────
export const SANTA_CARDS: SaintCard[] = [
  { n: 1, name: "Nossa Senhora Rainha", title: "Coroa dourada e Sagrado Coração", attrs: "Coroa com pérolas, manto bordado de rosas, coração com chama e raios, terço com medalha", img: `/img/santa-rainha-m.webp` },
  { n: 2, name: "Nossa Senhora Aparecida", title: "A padroeira do Brasil", attrs: "Manto azul-marinho com arabescos, coroa real, gola de pérolas, rosário", img: `/img/santa-aparecida-m.webp` },
  { n: 3, name: "Nossa Senhora das Graças", title: "A da Medalha Milagrosa", attrs: "Manto azul com lírios, faixa azul, medalha, rosário", img: `/img/santa-gracas-m.webp` },
  { n: 4, name: "Nossa Senhora de Fátima", title: "A Senhora do Rosário", attrs: "Véu branco, faixa azul, coroa de flores, painéis com rosas, rosário", img: `/img/santa-fatima-m.webp` },
  { n: 5, name: "Santa Teresinha", title: "A santa das rosas", attrs: "Véu preto e branco, hábito marrom, manto floral, buquê, crucifixo", img: `/img/santa-teresinha-m.webp` },
  { n: 6, name: "Santa Joana d'Arc", title: "Coragem para cumprir a missão", attrs: "Armadura, saia com flor-de-lis, estandarte, espada, cinto e botas", img: `/img/santa-joana-m.webp` },
  { n: 7, name: "Santa Rosa", title: "A coroa de rosas", attrs: "Coroa de rosas, véu creme, manto marrom florido, buquê, terço perolado", img: `/img/santa-rosa-m.webp` },
  { n: 8, name: "Santa Cecília", title: "A padroeira dos músicos", attrs: "Harpa, coroa de rosas, vestido com barrado dourado, manto bordado", img: `/img/santa-cecilia-m.webp` },
  { n: 9, name: "Santa Luzia", title: "A protetora dos olhos", attrs: "Manto vermelho com lírios, lamparina, ramo de palma, cordão com borlas", img: `/img/santa-luzia-m.webp` },
  { n: 10, name: "Santa Rita", title: "A santa das causas impossíveis", attrs: "Hábito preto, touca branca, buquê de rosas, crucifixo, rosário", img: `/img/santa-rita-m.webp` },
];

// 10 santos. 5 têm foto real (recortada do banner de santos do site de referência: Pedro, Antônio,
// José, Jorge, Bento). Os outros 5 ficam com placeholder até o dono fornecer/gerar a imagem. // TODO
export const SANTO_CARDS: SaintCard[] = [
  { n: 1, name: "São José", title: "O pai adotivo de Jesus", attrs: "Lírios, esquadro de carpinteiro, manto verde e túnica branca", img: "/img/santo-jose.webp" },
  { n: 2, name: "Santo Antônio", title: "O santo casamenteiro", attrs: "Menino Jesus no colo, lírios, hábito marrom e terço", img: "/img/santo-antonio.webp" },
  { n: 3, name: "São Francisco", title: "O santo dos animais", attrs: "", img: "/img/santo-placeholder.svg" },
  { n: 4, name: "São Jorge", title: "O santo guerreiro", attrs: "Armadura, capa vermelha, lança e escudo com a cruz", img: "/img/santo-jorge.webp" },
  { n: 5, name: "São Pedro", title: "O guardião das chaves", attrs: "As chaves do céu, livro, manto azul e branco", img: "/img/santo-pedro.webp" },
  { n: 6, name: "São Paulo", title: "O apóstolo das nações", attrs: "", img: "/img/santo-placeholder.svg" },
  { n: 7, name: "São Bento", title: "O protetor contra o mal", attrs: "Hábito preto, livro da regra, cruz de São Bento", img: "/img/santo-bento.webp" },
  { n: 8, name: "São Sebastião", title: "", attrs: "", img: "/img/santo-placeholder.svg" },
  { n: 9, name: "São João Batista", title: "", attrs: "", img: "/img/santo-placeholder.svg" },
  { n: 10, name: "São Judas Tadeu", title: "", attrs: "", img: "/img/santo-placeholder.svg" },
];

export const LP_SANTAS = SANTA_CARDS.map((s) => s.name);
export const LP_SANTOS = SANTO_CARDS.map((s) => s.name);

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
      trust: "20 receitas (10 santas + 10 santos) · a partir de R$ 19,90 · PDF no e-mail · 7 dias de garantia",
      image: `/img/checkout-santas.webp`,
    },
  },
  {
    key: "dor",
    type: "product_in_use",
    label: "Dor — Já aconteceu com você?",
    title: "Já aconteceu com você?",
    body: "Você senta com a linha na mão, cheia de vontade de fazer uma Nossa Senhora, e vai procurar como faz. Acha mil vídeos, cada um de um jeito, a moça fala rápido e corta justo na hora de montar. Aí você desmancha, refaz, desmancha de novo… e guarda tudo com aquela pontinha de raiva. Não é que você não sabe crochê. É que ninguém nunca te deu o gráfico certo, com cada parte explicada.",
    config: { imageUrl: `/img/santa-aparecida.webp` },
  },
  {
    key: "video",
    type: "video",
    label: "Vídeo (ative no admin)",
    title: "Veja uma santinha nascer na agulha",
    subtitle: "Da primeira carreira ao acabamento.",
    config: { desktopVideoUrl: "", posterUrl: "" },
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
        { icon: "chart", title: "O gráfico desenhado parte por parte", text: "Cabeça, manto, base — cada peça da santinha no gráfico." },
        { icon: "hook", title: "A lista de material", text: "Qual linha, qual agulha e as cores do fio de cada peça." },
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
      image: `/img/receitateresinha.webp`,
      pieces: ["Auréola florida", "Véu preto e branco", "Manto com rosas", "Túnica marrom", "Buquê de rosas", "Crucifixo", "Terço dourado", "Legenda dos pontos"],
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
      image: `/img/pacote-completo.webp`,
      items: [
        { icon: "hook", title: "Materiais e linha por cor", text: "Linha, agulha, enchimento e olhos, e quantos gramas de cada cor separar." },
        { icon: "chart", title: "Carreira por carreira", text: "O que fazer em cada carreira e o total de pontos no fim dela." },
        { icon: "check", title: "Legenda dos pontos", text: "Anel mágico, ponto baixo, aumento, diminuição, ponto pipoca — cada sigla explicada." },
        { icon: "flower", title: "Montagem em ordem", text: "Onde costurar braços, manto, coroa e flores para a santa ficar de pé e simétrica." },
        { icon: "shield", title: "Ajustes e soluções", text: "O que fazer se o fundo ondular, se o enchimento aparecer ou se o manto arrastar." },
        { icon: "book", title: "As peças ampliadas", text: "Uma prancha por santa, com a foto de cada peça pronta ao lado do gráfico: 60 peças ao todo." },
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
      image: `/img/checkout-santas.webp`,
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
    type: "models_included",
    label: "A coleção (santas e santos)",
    title: "Dez santinhas. Dez santos. Cada um com as próprias peças.",
    subtitle: "Toque em Santas ou Santos para ver todos. O número é a ordem da receita no PDF.",
    config: { santas: SANTA_CARDS, santos: SANTO_CARDS },
  },
  {
    key: "diferencial",
    type: "product_in_use",
    label: "Diferencial",
    title: "Por que aqui é diferente",
    body: 'A maioria vende uma foto bonita e te deixa adivinhar como se chega naquilo. Aqui não. Cada peça vem destrinchada: você vê onde começa, onde aumenta e onde arremata. É quase como ter alguém do seu lado dizendo "agora faz isso".',
    config: { imageUrl: `/img/santa-teresinha.webp` },
  },
  { key: "reviews", type: "reviews", label: "Prova social (depoimentos reais)", title: "O que as artesãs estão dizendo", subtitle: "" },
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
    subtitle: "São 20 receitas — 10 santas e 10 santos. Produto digital: você recebe os PDFs por e-mail. Acesso vitalício, imprima quantas vezes quiser.",
    config: {},
  },
  {
    key: "garantia",
    type: "product_in_use",
    label: "Garantia",
    title: "Faça a primeira santinha. Se não for pra você, o dinheiro volta.",
    body: "Você tem 7 dias para abrir o material, ler os gráficos e começar a sua primeira peça com calma. Se sentir que não é pra você, responde o e-mail da compra e devolve o valor integral — sem formulário, sem pergunta, sem letra miúda. O risco é todo meu: você só continua se gostar.",
    config: {},
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
    config: { image: `/img/checkout-santas.webp` },
  },
];

export const LP_FAQ: { question: string; answer: string }[] = [
  { question: "Preciso saber crochê?", answer: "Sim, o básico — ponto baixo e ponto alto. Não é curso do zero, é a coleção de gráficos." },
  { question: "Qual a diferença entre o Básico e o Completo?", answer: "O Básico traz as 20 receitas em gráfico (foto, gráfico e cores de cada peça). O Completo traz tudo isso + o livro escrito de 150 páginas (carreira por carreira), a lista de materiais, a legenda, a montagem em ordem, as 60 peças ampliadas e 3 bônus." },
  { question: "Leio gráfico devagar, dou conta?", answer: "Dá. O material explica a legenda e vai peça por peça. No Completo ainda tem a receita escrita carreira por carreira." },
  { question: "Como recebo?", answer: "É digital. Assim que o PIX confirma, o acesso cai no seu e-mail (celular, tablet ou computador). Nada é enviado pelo correio." },
  { question: "Posso vender as peças que eu fizer?", answer: "Pode. Os gráficos são pra você fazer e vender as suas peças. Só não pode revender o PDF." },
  { question: "E se não for pra mim?", answer: "7 dias de garantia, devolvo o valor integral." },
];

// ───────────── Catálogo: 2 pacotes + 3 order bumps + upsell ─────────────
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

// priceCents do PRODUTO do bump = âncora (2× a oferta) → o checkout mostra "de R$X" riscado + "-50%".
export const LP_BUMP_PRODUCTS = [
  { slug: "bump-livro-completo", sku: "FC-BUMP-LIVRO", name: "Livro de receitas completas + 3 bônus", priceCents: 1400, shortDescription: "Livro de 150 páginas (carreira por carreira), lista de materiais e 3 bônus." },
  { slug: "bump-arcanjos", sku: "FC-BUMP-ARCANJOS", name: "3 arcanjos de crochê", priceCents: 1580, shortDescription: "Receitas de São Gabriel, São Miguel e São Rafael, com materiais e montagem." },
  { slug: "bump-presepio", sku: "FC-BUMP-PRESEPIO", name: "Presépio de Natal em crochê", priceCents: 2380, shortDescription: "Presépio completo com 13 peças (Maria, José, Menino Jesus, Reis Magos e mais)." },
];

export const LP_BUMPS = [
  { name: "Livro de receitas completas + 3 bônus", productSlug: "bump-livro-completo", title: "Leve o livro de receitas completas, com lista de material + 3 bônus", description: "150 páginas, cada santa escrita carreira por carreira, lista de materiais e os 3 bônus (livrinho, cartões e marca-página).", benefit: "Por R$ 7,00", imageUrl: "/img/livro-carreiras.webp", priceCents: 700, sortOrder: 1, triggerSlugs: ["pacote-basico"] },
  { name: "3 arcanjos de crochê", productSlug: "bump-arcanjos", title: "Leve também a receita dos 3 arcanjos de crochê", description: "Gabriel com os lírios e a trombeta, Miguel com a espada e o escudo, Rafael com o cajado e o peixe. Todos com asas, auréola e manto, no mesmo estilo das santinhas.", benefit: "Por R$ 7,90", imageUrl: "/img/bump-arcanjos.webp", priceCents: 790, sortOrder: 2, triggerSlugs: ["pacote-basico", "pacote-completo"] },
  { name: "Presépio de Natal em crochê", productSlug: "bump-presepio", title: "Leve o Presépio de Natal em crochê", description: "O presépio completo com 13 peças: Maria, José, Menino Jesus, o anjo, os pastores, os 3 Reis Magos e a Estrela de Belém.", benefit: "Por R$ 11,90", imageUrl: "/img/bump-presepio.webp", priceCents: 1190, sortOrder: 3, triggerSlugs: ["pacote-basico", "pacote-completo"] },
];

export const LP_UPSELL_PRODUCT = { slug: "upsell-calendario", sku: "FC-UP-CALENDARIO", name: "Calendário do Crochê Devocional", priceCents: 2700, shortDescription: "Uma peça nova por mês, o ano inteiro." };
export const LP_UPSELL = { name: "Calendário do Crochê Devocional", productSlug: "upsell-calendario", headline: "Já que você começou, leve o ano inteiro", title: "Calendário do Crochê Devocional: uma peça nova por mês", description: "A cada mês, um gráfico novo de uma santinha ou peça devocional pra você fazer, presentear e vender. O ano todo com ideia na mão.", priceCents: 2700, sortOrder: 1 };

export const WHEEL_DISCOUNT_PERCENT = 50;
