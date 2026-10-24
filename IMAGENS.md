# Imagens da landing — prompts e especificações

Eu **não gero imagens**. Abaixo estão os prompts (em inglês, prontos para Midjourney / Flux / DALL·E 3)
com o nome do arquivo e a dimensão de cada imagem.

**Como está hoje:** em `public/img/` há **placeholders em SVG** (retângulo creme com o nome e a dimensão
de cada arquivo). A landing já aponta para eles, então a página não quebra.

**Como trocar pela imagem final (duas opções):**

1. **Pelo admin (recomendado, sem mexer no código):** em `Admin → Landing page`, abra a seção e use o
   campo de imagem (upload ou link) — vale para a imagem do **Diferencial** (mãos crochetando) e da
   **Autora**, e a imagem do **produto** em `Admin → Produtos`.
2. **Trocando o arquivo:** gere a imagem final (PNG), salve em `public/img/` com o **mesmo nome do
   placeholder** (ex.: `hero-mockup.png`) e atualize o `src` onde o arquivo é referenciado
   (hero e galeria ficam em `src/components/landing/croche.tsx` e `src/content/lp.ts`). Troque a
   extensão `.svg` por `.png`.

> As imagens do **hero** (mockup) e da **galeria de peças** (3 santinhas) são fixas no código.
> As demais (diferencial, autora, produto) podem ser definidas pelo admin.

---

## hero-mockup — `hero-mockup.png` (1200×1200)
Mostra uma página do e-book de gráficos num celular/tablet (a LP já monta o moldura em CSS).
> cozy warm photo, a smartphone and a tablet showing a crochet pattern e-book page, next to a handmade crochet figurine of a serene Virgin Mary in blue and white, balls of yarn and a crochet hook on a rustic wooden table, soft natural window light, shallow depth of field, homey devotional mood

## peca-aparecida — `peca-aparecida.png` (800×800)
> handmade amigurumi crochet figurine of Our Lady Aparecida, blue mantle, neat stitches, white background, product photo

## peca-sagrado-coracao — `peca-sagrado-coracao.png` (800×800)
> handmade crochet Sacred Heart ornament, red and gold yarn, white background, product photo

## peca-anjo — `peca-anjo.png` (800×800)
> handmade crochet guardian angel figurine, cream yarn with gold details, white background, product photo

## maos-crochetando — `maos-crochetando.png` (1200×800)
> close-up of older woman's hands crocheting with cream yarn, wedding ring, warm light, soft focus, peaceful

## autora — `autora.png` (600×600, redonda)
Placeholder para a **foto real** da autora. <!-- TODO: dono colocar foto real -->
Use uma foto real da autora, enquadramento quadrado (a LP recorta em círculo).
