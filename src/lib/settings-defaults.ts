/**
 * Valores padrão das configurações da loja. Tudo é editável em Admin → Configurações.
 * Campos marcados com [PREENCHER] dependem de dados reais da empresa.
 */
export const SETTING_DEFAULTS: Record<string, string> = {
  // Loja
  store_name: "Fé em Crochê",
  store_tagline: "Coleção Santinhas em Crochê — gráficos e passo a passo em PDF",
  logo_url: "",
  favicon_url: "",
  company_name: "",
  company_document: "",
  contact_email: "",
  contact_phone: "",
  whatsapp: "",
  address: "",
  support_hours: "",
  instagram_url: "",
  tiktok_url: "",
  facebook_url: "",
  youtube_url: "",
  // Aparência (tokens do design system — paleta devocional e acolhedora)
  theme_primary: "#B65B3C", // terracota (botões)
  theme_secondary: "#C79A3E", // dourado suave
  theme_accent: "#2E5A9C", // azul mariano
  theme_ink: "#3C2E25", // marrom quente (texto)
  theme_background: "#FBF6EE", // creme
  // Layout
  announcement_text: "",
  header_cta_label: "Quero a coleção",
  sticky_cta_enabled: "true",
  sticky_cta_label: "QUERO MINHAS SANTINHAS",
  footer_text: "",
  // Checkout
  require_cpf: "true",
  shipping_flat_cents: "0",
  shipping_note: "",
  pix_expiration_minutes: "30",
  checkout_note: "",
  // Confiança/urgência no checkout (CNPJ usa company_document; razão social usa company_name)
  checkout_reservation_minutes: "15",
  // Forma de pagamento — PIX (exibição no checkout)
  pix_enabled: "true",
  pix_method_label: "PIX",
  pix_badge: "aprovação imediata",
  pix_description: "Aprovação imediata. O QR Code e o código copia e cola aparecem na próxima tela. Assim que o PIX confirma, a coleção chega no seu e-mail.",
  pix_button_label: "Gerar PIX e receber a coleção",
  // Forma de pagamento — Crediário (protocolo próprio, NÃO é cartão). Desativado até configurar.
  crediario_enabled: "false",
  crediario_method_label: "Crediário",
  crediario_method_subtitle: "Em até {parcelas}x · com o protocolo do seu crediário",
  crediario_section_title: "Pagamento pelo crediário",
  crediario_description: "Use o protocolo do seu crediário. Seu pedido fica registrado e é confirmado após a análise.",
  crediario_protocol_label: "Número do protocolo",
  crediario_protocol_placeholder: "Digite os 16 dígitos do seu protocolo",
  crediario_protocol_digits: "16",
  crediario_protocol_help: "",
  crediario_protocol_error: "Informe os {n} dígitos do protocolo (somente números).",
  crediario_validity_label: "Validade do protocolo",
  crediario_validity_placeholder: "MM/AA",
  crediario_validity_format: "MM/AA",
  crediario_validity_error: "Informe a validade no formato {formato}.",
  crediario_validity_expired_error: "Este protocolo está vencido. Confira a validade.",
  crediario_validity_reject_expired: "true",
  crediario_cpf_label: "3 últimos dígitos do CPF",
  crediario_cpf_placeholder: "Digite os 3 últimos dígitos",
  crediario_cpf_digits: "3",
  crediario_cpf_error: "Informe os {n} últimos dígitos do CPF.",
  crediario_installments_label: "Parcelamento",
  crediario_installments_description: "",
  crediario_max_installments: "2",
  crediario_installment_text: "{n}x de {valor}",
  crediario_help_text: "",
  crediario_error_message: "Não foi possível registrar seu pedido no crediário. Confira os dados e tente novamente.",
  crediario_success_title: "Pedido recebido!",
  crediario_success_message: "Seu pedido foi registrado no crediário e está aguardando análise. Avisaremos você pelo WhatsApp ou e-mail informado.",
  crediario_info_message: "Nenhum valor é cobrado agora. A confirmação acontece após a análise do protocolo.",
  crediario_button_label: "Confirmar pedido no crediário",
  crediario_security_text: "Seus dados são usados apenas para a análise do crediário e ficam protegidos.",
  marketing_consent_label: "Aceito receber novidades e lembretes sobre meu pedido por WhatsApp e e-mail.",
  // E-mails transacionais (Resend)
  email_confirmation_enabled: "true",
  email_recovery_enabled: "true",
  email_checkout_enabled: "true",
  email_recovery_delay_minutes: "10",
  email_shipping_enabled: "true",
  // Rastreamento
  meta_pixel_enabled: "true",
  meta_pixel_id: "",
  meta_capi_enabled: "true",
  ga_enabled: "true",
  ga_id: "",
  cookie_banner_enabled: "true",
  // SEO
  seo_title: "Fé em Crochê — Coleção Santinhas em Crochê (gráficos em PDF)",
  seo_description:
    "Faça suas próprias santinhas de crochê: o gráfico de cada peça, a lista de linha e agulha e o passo a passo de montagem, em PDF. Acesso na hora via PIX. Garantia de 7 dias.",
  og_image_url: "",
  // Políticas (texto editável — revise com seu jurídico)
  policy_privacy: `[PREENCHER] Política de Privacidade

Este texto é um modelo inicial e precisa ser revisado com os dados reais da empresa.

1. Quais dados coletamos
Nome, WhatsApp, e-mail, CPF (quando exigido para o PIX) e endereço de entrega, informados por você no checkout. Também registramos dados de navegação anônimos (páginas vistas, origem da visita e dispositivo) para entender o uso da loja.

2. Para que usamos
Processar seu pedido, gerar o pagamento PIX junto ao nosso processador de pagamentos, entregar o acesso à coleção por e-mail, prestar atendimento e, somente com seu consentimento, enviar novidades.

3. Compartilhamento
Com o processador de pagamentos, com o serviço de envio de e-mail que entrega o acesso e, se você aceitar cookies de marketing, com plataformas de anúncios (Meta, Google).

4. Seus direitos (LGPD)
Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail de contato da loja.

5. Contato do controlador
[PREENCHER razão social, CNPJ e e-mail].`,
  policy_terms: `[PREENCHER] Termos de Uso

Este texto é um modelo inicial e precisa ser revisado com os dados reais da empresa.

Ao comprar você concorda com as condições de venda e as políticas publicadas. Preços e conteúdo da coleção podem ser alterados sem aviso, sem afetar compras já realizadas. O material é um PDF de uso pessoal: você pode fazer e vender as peças que criar com os gráficos, mas não pode revender nem redistribuir o PDF.`,
  policy_returns: `Política de Reembolso e Garantia de 7 dias

Este texto é um modelo inicial e precisa ser revisado com os dados reais da empresa.

A Coleção Santinhas em Crochê é um produto digital (PDF). Você tem 7 dias de garantia a partir da compra: se abrir o material e sentir que não é para você, basta enviar uma mensagem pelo nosso canal de atendimento informando o e-mail da compra, que devolvemos o valor integral, sem complicação (art. 49 do Código de Defesa do Consumidor).

O reembolso é feito pelo mesmo meio do pagamento (PIX). Após o reembolso, o acesso ao material é encerrado. Os gráficos são para você fazer e vender as suas próprias peças; a revenda ou redistribuição do PDF não é permitida.

[PREENCHER prazo de processamento do reembolso e canal oficial de atendimento].`,
  policy_cookies: `[PREENCHER] Política de Cookies

Usamos cookies essenciais para o funcionamento da loja (carrinho, sessão e segurança) e cookies de medição e marketing (Meta Pixel e Google Analytics) para medir e melhorar nossos anúncios. Os cookies de medição e marketing ficam ativos por padrão, e você pode recusá-los a qualquer momento pelo aviso de cookies ou pelo link "Preferências de cookies" no rodapé do site. Depois de recusar, nenhum dado da sua navegação ou compra é enviado ao Meta ou ao Google.`,
};

export const POLICY_PAGES = {
  "politica-de-privacidade": { key: "policy_privacy", title: "Política de Privacidade" },
  termos: { key: "policy_terms", title: "Termos de Uso" },
  "trocas-e-devolucoes": { key: "policy_returns", title: "Reembolso e Garantia" },
  cookies: { key: "policy_cookies", title: "Política de Cookies" },
} as const;
