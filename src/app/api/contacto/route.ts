import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  if (!data || typeof data !== "object") return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });

  const str = (k: string) => (typeof data[k] === "string" ? (data[k] as string).trim() : "");
  const nome = str("nome");
  const email = str("email");
  const mensagem = str("mensagem");

  // Bot preencheu o campo escondido: responde como se tivesse corrido bem e não envia nada.
  if (str("hp_dp7")) {
    console.warn("contacto: descartado pela armadilha de bots", { email });
    return NextResponse.json({ ok: true });
  }

  if (!nome || nome.length > 200) return NextResponse.json({ error: "Indique o seu nome." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return NextResponse.json({ error: "Indique um email válido." }, { status: 400 });
  if (!mensagem || mensagem.length > 5000)
    return NextResponse.json({ error: "Escreva a sua mensagem." }, { status: 400 });
  if (str("consentimento") !== "sim")
    return NextResponse.json({ error: "É preciso aceitar a Política de Privacidade." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || "geral@duplaconsultores.pt";
  if (!apiKey || !from) {
    console.error("contacto: RESEND_API_KEY ou CONTACT_FROM em falta");
    return NextResponse.json({ error: "O envio de mensagens ainda não está configurado." }, { status: 503 });
  }

  const html = `
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mensagem:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(mensagem)}</p>
    <hr><p style="color:#999;font-size:12px">Enviado pelo formulário de duplaconsultores.pt. O remetente aceitou a Política de Privacidade.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Contacto pelo site — ${nome.slice(0, 80)}`,
      html,
      text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`,
    }),
  });

  // fetch não rebenta num 4xx/5xx: é preciso olhar para o status.
  if (!res.ok) {
    console.error("contacto: Resend respondeu", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Não foi possível enviar a mensagem." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
