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

---

## Imagens novas (modelo 2 pacotes / seções do site de referência)

## hero-santinhas — `hero-santinhas.png` (800×500, fundo transparente)
Trio de santinhas de crochê lado a lado, para o topo (fundo azul mariano).
> three handmade crochet amigurumi saint figurines standing side by side (Our Lady Aparecida in blue, Saint Teresa with roses, a nun saint), neat stitches, transparent/cutout background, warm studio light, product photo

## pecas-folha — `pecas-folha.png` (1000×750)
Foto de uma página de "folha das peças" (gráficos de crochê de cada parte, com foto e cores).
> a printed crochet pattern sheet page showing amigurumi diagrams/charts of saint figurine parts (halo, veil, mantle, tunic, bouquet, crucifix, rosary) with small photos and yarn color legend, flat lay, clean

## livro-paginas — `livro-paginas.png` (1000×750)
Páginas abertas do livro de receitas de 150 páginas (receita escrita carreira por carreira).
> open pages of a printed crochet recipe book, row-by-row written amigurumi instructions for saint dolls with photos, soft devotional styling, flat lay on wood with yarn and rosary

## colecao-santinhas — `colecao-santinhas.png` (1000×750)
Várias santinhas de crochê juntas (grupo), para a seção "para quem você vai fazer".
> group photo of several handmade crochet amigurumi catholic saint figurines together (Our Lady, Saint Joan of Arc in armor, Saint Cecilia with a harp, Saint Therese), soft pink background, warm light, product photo

## Imagens dos order bumps (checkout) — 400×400 cada
- `bump-livro-completo.png` — open recipe book pages + 3 bonus items (bookmark, cards), product photo, white background
- `bump-arcanjos.png` — three handmade crochet archangel figurines (Michael, Gabriel, Raphael), white background, product photo
- `bump-presepio.png` — handmade crochet nativity scene set (Mary, Joseph, baby Jesus, wise men, star), white background, product photo

> Order bumps aparecem no checkout; as imagens ficam em `public/img/bump-*.svg` e são editáveis em Admin → Order bumps (campo de imagem).
