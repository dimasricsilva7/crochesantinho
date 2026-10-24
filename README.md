# Fé em Crochê — Coleção Santinhas

Landing page de vendas (produto único digital) + checkout próprio PIX (BravoPay) + painel admin
+ monitor "ao vivo" de visitantes. Construído reaproveitando a base do **HAMA-BEADS**
(Next.js App Router + TypeScript + Tailwind + Prisma + Neon).

## Stack
- Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3
- Prisma + PostgreSQL (Neon)
- Pagamento: BravoPay (PIX) — server-side, com webhook assinado (HMAC)
- E-mails transacionais: Resend
- Deploy: Vercel

## Produto
PDF com gráficos de santinhas em crochê. **R$ 17**, pagamento único via PIX, acesso entregue por e-mail.
- Order bumps no checkout: "+10 santos extras + Terço (R$ 10)" e "Vídeo-aula de montagem (R$ 12,90)".
- Upsell pós-pagamento: "Calendário do Crochê Devocional (R$ 27)".

## Scripts
```bash
npm run dev            # ambiente local
npm run build:local    # build sem migrate (sem DB)
npm run build          # prisma generate + migrate deploy + next build (precisa de DATABASE_URL)
npm run lint
npm run typecheck
npm run db:seed        # semeia produto, bumps, upsell, seções da landing e FAQ
npm run admin:hash -- "sua-senha"   # gera o hash do admin
```

## Configuração
Copie `.env.example` para `.env` e preencha. Variáveis obrigatórias e opcionais estão documentadas lá
e em `docs/` (pendências do dono). Imagens: veja `IMAGENS.md`.

## Edição sem código (admin)
`/admin` (login por senha). Edita textos de todas as seções da landing (`/admin/landing`), produtos e
preços (`/admin/produtos`), order bumps e upsell, imagens (upload ou link), depoimentos
(`/admin/avaliacoes`) e configurações. A aba **Ao vivo** mostra quem está no site agora e em qual página.
