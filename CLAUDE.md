# duplaconsultores

Site de duplaconsultores.pt em Next.js 16 (App Router), sem Tailwind — CSS simples em
`src/app/globals.css`. Ver o README para páginas, formulário e variáveis.

É um projeto **separado do ours-hub**: repo, projeto Vercel, variáveis e conta Resend próprios.
Não partilhar código nem credenciais com o Hub.

**Exceção controlada (29/10/2026, pedido do Hélder): o portal de formação-ação.** O diagnóstico
(`/diagnostico`, perguntas em `src/content/diagnostico.ts`) envia para a rota **pública** de formulários
do Hub (`hub.ours.pt/api/public/sites/duplaconsultores.pt/formulario/diagnostico`), como os sites de
clientes da OURS: sem chaves, sem código partilhado. O Hub guarda e manda os emails. O plano do portal
está no guia «Formação-ação» do Hub (`src/lib/manual/formacaoAcao.ts` do ours-hub). Mudar as dimensões
do diagnóstico obriga a mudar `DIMENSOES_DUPLA` em `src/lib/sites/formularios.ts` do ours-hub.

## Regras

- Commits autorados `Claude <noreply@anthropic.com>`. A integração no `main` é por fast-forward
  (ou fica para o Hélder), nunca por merge via API do GitHub — o commit de merge ficaria autorado
  pela conta pessoal, que não é membro da equipa da Vercel, e a Vercel bloqueia o deploy.
- É uma réplica fiel do site antigo: mudanças de aspeto só quando pedidas. As medidas de referência
  estão comentadas no CSS (tiradas do original a 1440px e 390px).
- Não indicar caminhos do painel da Vercel, do Cloudflare ou do Resend de cabeça — mudam; diz o
  que é preciso fazer e deixa a pessoa encontrar o sítio.
- `fetch` não rebenta num 4xx/5xx: verificar sempre `res.ok`.

## Migração (setembro de 2026) — estado

1. Código: feito.
2. Projeto Vercel ligado a este repo + variáveis do Resend: por fazer.
3. Email: o `geral@` sai do cPanel. Decisão: Cloudflare Email Routing → Gmail gratuito dedicado,
   com "Enviar como" pelo SMTP do Resend. O Resend **não** tem caixas de correio.
4. DNS: só se troca quando o email tiver destino (MX), para não se perder correio. Exportar antes
   o histórico do `geral@` do cPanel.
