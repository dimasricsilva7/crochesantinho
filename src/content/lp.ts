/**
 * Copy da landing "Fé em Crochê — Coleção Santinhas".
 * Fonte única da verdade: é semeada no banco (prisma/seed.ts → LandingSection/Faq) para o admin
 * editar em /admin/landing, e também serve de FALLBACK na renderização da página (a LP mostra o
 * texto exato mesmo antes de o banco ser semeado).
 *
 * IMPORTANTE: este arquivo NÃO importa nada interno (@/...), para poder ser importado tanto pela
 * app (via "@/content/lp") quanto pelo seed do Prisma (via "../src/content/lp").
 *
 * Regra do projeto: nada é inventado. Depoimentos, número de artesãs e a história da autora
 * vão como // TODO e devem ser preenchidos pelo dono.
 */

export type LpSection = {
  key: string;
  type: string; // casa com os editores do admin (hero, product_in_use, benefits, offer, reviews, final_cta)
  label: string;
  title?: string;
  subtitle?: string;
  body?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  config?: Record<string, unknown>;
};

export const LP_SECTIONS: LpSection[] = [
  {
    key: "hero",
    type: "hero",
    label: "Hero",
    title:
      "Faça as suas próprias santinhas de crochê — com o gráfico de cada peça e o passo a passo de como montar.",
    subtitle:
      "Chega de vídeo pela metade que te abandona bem na hora da montagem. Aqui cada parte vem no gráfico, com a lista de linha e agulha e a ordem certa de juntar tudo. Se você já faz ponto baixo e ponto alto, você faz essas peças.",
    ctaLabel: "Quero fazer minhas santinhas",
    ctaTarget: "#oferta",
    config: {
      eyebrow: "Pra você que tem fé nas mãos e amor pelo crochê",
      // Linha de confiança (editável em Indicadores). "[X]" é placeholder — dono coloca o número real.
      stats: [
        { value: "Acesso na hora", label: "pagamento via PIX" },
        { value: "+ de [X]", label: "artesãs" }, // TODO: dono — número real de artesãs
        { value: "Garantia", label: "de 7 dias" },
      ],
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
    title: "O que tem dentro da coleção",
    subtitle:
      "A Coleção Santinhas em Crochê é um material em PDF com as peças que mais te pedem: Nossa Senhora Aparecida, Sagrado Coração de Jesus, Anjo da Guarda, São Bento e mais. De cada peça você recebe o que precisa pra fazer do começo ao fim. Abre no celular e fica do lado da sua poltrona — dá pra ir acompanhando carreira por carreira.",
    config: {
      items: [
        { icon: "grid", title: "O gráfico desenhado parte por parte", text: "Cabeça, manto, base — cada parte da peça no gráfico." },
        { icon: "palette", title: "A lista de material", text: "Qual linha, qual agulha e quanto rende cada peça." },
        { icon: "check", title: "O passo a passo de montagem", text: "A ordem certa de juntar tudo, sem adivinhação." },
      ],
      // Galeria de peças (placeholders — trocar pelas fotos reais no admin ou em /public/img)
      gallery: [
        { src: "/img/peca-aparecida.svg", alt: "Nossa Senhora Aparecida em crochê" },
        { src: "/img/peca-sagrado-coracao.svg", alt: "Sagrado Coração de Jesus em crochê" },
        { src: "/img/peca-anjo.svg", alt: "Anjo da Guarda em crochê" },
      ],
    },
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
    key: "paraquem",
    type: "product_in_use",
    label: "Para quem é",
    title: "Feito pra quem crocheta com o coração",
    body: "Pra quem faz por devoção, pra rezar com a peça na mão. Pra quem quer presentear num batizado, num aniversário, no Dia das Mães. E pra quem vende no bazar da paróquia e no grupo da cidade — tem muita artesã tirando uma renda bonita com isso. Quem já pegou o básico do crochê dá conta tranquilo.",
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
    // TODO: dono escrever a verdade sobre a autora (primeira pessoa, amor pelo crochê e pela fé).
    body: "[A SER PREENCHIDO PELA AUTORA] Escreva aqui, em primeira pessoa, quem você é, há quanto tempo crocheta e o que a fé e o crochê significam pra você. Uns 3 ou 4 parágrafos curtos, do seu jeito de falar, deixam esta parte verdadeira — e é isso que aproxima quem está lendo.",
    config: { imageUrl: "/img/autora.svg", round: true },
  },
  {
    key: "oferta",
    type: "offer",
    label: "Oferta",
    title: "Comece a sua primeira santinha hoje",
    subtitle: "Acesso imediato por e-mail · pagamento único via PIX · sem mensalidade",
    ctaLabel: "Quero a coleção agora",
    config: {
      // productId é preenchido pelo seed (produto da coleção)
      bullets: [
        "Acesso imediato por e-mail",
        "Pagamento único via PIX — sem mensalidade",
        "Abre no celular, tablet ou computador",
      ],
      seals: ["Compra 100% segura", "Acesso na hora", "Garantia de 7 dias"],
    },
  },
  {
    key: "garantia",
    type: "product_in_use",
    label: "Garantia",
    title: "Sem risco pra você",
    body: "Você tem 7 dias de garantia. Se abrir e sentir que não é pra você, é só mandar uma mensagem que eu devolvo o valor integral. Simples assim.",
  },
  {
    key: "faq",
    type: "faq",
    label: "FAQ",
    title: "Perguntas frequentes",
  },
  {
    key: "fechamento",
    type: "final_cta",
    label: "Fechamento",
    title: "A sua primeira santinha pode estar pronta ainda esta semana.",
    subtitle: "Na sua mão, no seu cantinho de oração, ou no colo de quem você ama. Começa por ela hoje.",
    ctaLabel: "Quero começar agora",
    ctaTarget: "#oferta",
  },
];

export const LP_FAQ: { question: string; answer: string }[] = [
  { question: "Preciso saber crochê?", answer: "Sim, o básico — ponto baixo e ponto alto. Não é curso do zero, é a coleção de gráficos." },
  { question: "Leio gráfico devagar, dou conta?", answer: "Dá. O material explica a legenda e vai peça por peça." },
  { question: "Como recebo?", answer: "É digital. Assim que o PIX confirma, o acesso cai no seu e-mail (celular, tablet ou computador)." },
  { question: "Posso vender as peças que eu fizer?", answer: "Pode. Os gráficos são pra você fazer e vender as suas peças. Só não pode revender o PDF." },
  { question: "E se não for pra mim?", answer: "7 dias de garantia, devolvo o valor." },
];

// ───────────── Catálogo (produto único + bumps + upsell) ─────────────
// Valores em centavos. Produto digital: o dono sobe o PDF no admin (digitalFileUrl) depois.

export const LP_PRODUCT = {
  slug: "colecao-santinhas",
  sku: "FC-SANTINHAS",
  name: "Coleção Santinhas em Crochê",
  priceCents: 1700,
  shortDescription: "PDF com o gráfico de cada santinha, a lista de linha e agulha e o passo a passo de montagem.",
  description:
    "Material em PDF com os gráficos das santinhas de crochê (Nossa Senhora Aparecida, Sagrado Coração de Jesus, Anjo da Guarda, São Bento e mais). De cada peça: o gráfico parte por parte, a lista de material e o passo a passo de montagem na ordem certa. Acesso enviado por e-mail logo após a confirmação do PIX.",
  digitalDeliveryNote: "Acesso enviado por e-mail logo após a confirmação do pagamento (PIX).",
  // Composição exibida na seção de oferta
  components: [
    { type: "digital", label: "Gráficos parte por parte (cabeça, manto, base)" },
    { type: "digital", label: "Lista de material: linha, agulha e rendimento" },
    { type: "digital", label: "Passo a passo de montagem na ordem certa" },
  ],
};

// Produtos dos bumps/upsell (ativos para o checkout cotar, mas só aparecem como oferta — a LP não tem catálogo).
export const LP_BUMP_PRODUCTS = [
  {
    slug: "bump-santos-terco",
    sku: "FC-BUMP-SANTOS",
    name: "10 santos extras + Terço em crochê",
    priceCents: 2700, // preço cheio; o bump aplica R$10
    shortDescription: "Mais 10 santos em gráfico e um terço em crochê.",
    digitalDeliveryNote: "Acesso enviado junto com a sua coleção, por e-mail.",
  },
  {
    slug: "bump-videoaula",
    sku: "FC-BUMP-VIDEO",
    name: "Vídeo-aula de montagem das peças mais difíceis",
    priceCents: 1290,
    shortDescription: "Vídeo mostrando a montagem das partes que mais travam.",
    digitalDeliveryNote: "Acesso enviado junto com a sua coleção, por e-mail.",
  },
];

export const LP_BUMPS = [
  {
    name: "10 santos extras + Terço em crochê",
    productSlug: "bump-santos-terco",
    title: "Adicione 10 santos extras + Terço em crochê",
    description: "Mais 10 santinhas em gráfico e um terço em crochê, pra você nunca ficar sem o que fazer.",
    benefit: "De R$ 27 por R$ 10",
    priceCents: 1000,
    sortOrder: 1,
  },
  {
    name: "Vídeo-aula de montagem",
    productSlug: "bump-videoaula",
    title: "Adicione a vídeo-aula de montagem das peças mais difíceis",
    description: "Um vídeo te acompanhando na montagem das partes que mais dão trabalho.",
    benefit: "Por R$ 12,90",
    priceCents: 1290,
    sortOrder: 2,
  },
];

export const LP_UPSELL_PRODUCT = {
  slug: "upsell-calendario",
  sku: "FC-UP-CALENDARIO",
  name: "Calendário do Crochê Devocional",
  priceCents: 2700,
  shortDescription: "Uma peça nova por mês, o ano inteiro.",
  digitalDeliveryNote: "Acesso enviado por e-mail logo após a confirmação do pagamento (PIX).",
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
