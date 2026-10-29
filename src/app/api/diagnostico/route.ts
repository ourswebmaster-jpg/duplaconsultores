import { NextResponse } from "next/server";

// Reencaminha o diagnóstico para o Hub da OURS (rota pública de formulários de sites). Não há segredo
// nenhum: o Hub valida o que chega, guarda e avisa o geral@. O IP do visitante segue num cabeçalho, para
// o limite por pessoa do Hub.
const HUB = "https://hub.ours.pt/api/public/sites/duplaconsultores.pt/formulario/diagnostico";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
  try {
    const res = await fetch(HUB, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-visitante-ip": ip },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) return NextResponse.json({ ok: true });
    const erro = ((await res.json().catch(() => ({}))) as { error?: string }).error;
    const msg =
      res.status === 429
        ? "Demasiados pedidos. Tente de novo daqui a pouco."
        : erro === "invalid"
          ? "Verifique o nome, o email, a empresa e o consentimento."
          : "Não foi possível enviar o diagnóstico.";
    return NextResponse.json({ error: msg }, { status: res.status === 429 ? 429 : 502 });
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar o diagnóstico." }, { status: 502 });
  }
}
