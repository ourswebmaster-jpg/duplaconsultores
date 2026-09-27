# duplaconsultores

Site de **duplaconsultores.pt** (Dupla Consultores — Sandra Regala & Hélder Santos), em Next.js.
Réplica fiel do site WordPress (tema Avada) que estava no cPanel.

```bash
npm install
npm run dev          # localhost:3000
npm run lint
npm run type-check
npm run build
```

## Páginas

- `/` — página inicial (herói, Sandra, Hélder, contactos + formulário)
- `/politica-de-privacidade`, `/politica-de-cookies`, `/termos-e-condicoes` — texto em `src/content/legal.ts`
- `/duplaconsultores-brochura.pdf` — o URL antigo em `/wp-content/uploads/...` redireciona para aqui

## Formulário "Fale connosco"

`src/app/api/contacto/route.ts` envia cada mensagem por email através do [Resend](https://resend.com),
com `reply_to` no email de quem escreveu. Variáveis (ver `.env.example`), definidas na Vercel:

| Variável | O quê |
|---|---|
| `RESEND_API_KEY` | chave da conta Resend do Dupla |
| `CONTACT_FROM` | remetente, num domínio verificado no Resend (ex. `Site Dupla <site@duplaconsultores.pt>`) |
| `CONTACT_TO` | destino — por omissão `geral@duplaconsultores.pt` |

Sem `RESEND_API_KEY`/`CONTACT_FROM` o formulário responde 503 e pede para escrever diretamente para o email.

## Cookies

O site não usa analytics nem pixéis. O aviso de cookies (`src/components/CookieBanner.tsx`) só guarda
a escolha em `localStorage` (`dupla-cookies`), porque a Política de Cookies promete esse aviso.
Se um dia entrar um script de terceiros, tem de ler essa escolha antes de carregar.
