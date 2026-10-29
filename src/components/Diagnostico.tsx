"use client";

import Link from "next/link";
import { useState } from "react";
import { DIMENSOES, ESCALA, resultado } from "@/content/diagnostico";

type Estado = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function Diagnostico() {
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [estado, setEstado] = useState<Estado>({ kind: "idle" });
  const total = DIMENSOES.reduce((s, d) => s + d.perguntas.length, 0);
  const respondidas = Object.keys(respostas).length;
  const res = resultado(respostas);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (respondidas < total) {
      setEstado({ kind: "error", message: `Faltam ${total - respondidas} respostas.` });
      return;
    }
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setEstado({ kind: "sending" });
    try {
      const r = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: f.nome, email: f.email, empresa: f.empresa, setor: f.setor, pessoas: f.pessoas,
          consentimento: f.consentimento, website: f.hp_dp7, respostas,
        }),
      });
      const b = (await r.json().catch(() => ({}))) as { error?: string };
      if (!r.ok) throw new Error(b.error || "Não foi possível enviar o diagnóstico.");
      setEstado({ kind: "ok" });
    } catch (err) {
      setEstado({
        kind: "error",
        message:
          (err instanceof Error ? err.message : "Não foi possível enviar o diagnóstico.") +
          " Pode escrever-nos para geral@duplaconsultores.pt.",
      });
    }
  }

  if (estado.kind === "ok") {
    return (
      <section className="diag">
        <h2>O seu resultado</h2>
        <ul className="diag__res">
          {res.map((d) => (
            <li key={d.id}>
              <div className="diag__res-top">
                <strong>{d.nome}</strong>
                <span>{d.pct}% · {d.nivel}</span>
              </div>
              <div className="diag__bar"><span style={{ width: `${d.pct}%` }} /></div>
              {d.pct < 67 && <p>Próximo passo: {d.proximoPasso}</p>}
            </li>
          ))}
        </ul>
        <p>Enviámos-lhe uma cópia por email. Se quiser transformar este resultado num plano, fale connosco.</p>
        <p><Link href="/#contactos">Falar com a Dupla</Link></p>
      </section>
    );
  }

  return (
    <form className="diag" onSubmit={onSubmit}>
      {DIMENSOES.map((d, i) => (
        <fieldset key={d.id} className="diag__dim">
          <legend>{i + 1}. {d.nome}</legend>
          {d.perguntas.map((p) => (
            <div key={p.id} className="diag__q">
              <p>{p.texto}</p>
              <div className="diag__opts" role="radiogroup" aria-label={p.texto}>
                {ESCALA.map((o) => (
                  <label key={o.v} className={respostas[p.id] === o.v ? "is-on" : undefined}>
                    <input type="radio" name={p.id} value={o.v} checked={respostas[p.id] === o.v}
                      onChange={() => setRespostas((r) => ({ ...r, [p.id]: o.v }))} />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </fieldset>
      ))}

      <fieldset className="diag__dim">
        <legend>Para receber o resultado</legend>
        <label className="field"><span>Nome</span><input name="nome" required maxLength={200} autoComplete="name" /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
        <label className="field"><span>Empresa</span><input name="empresa" required maxLength={200} autoComplete="organization" /></label>
        <label className="field"><span>Setor (opcional)</span><input name="setor" maxLength={200} /></label>
        <label className="field"><span>Número de pessoas (opcional)</span><input name="pessoas" maxLength={20} inputMode="numeric" /></label>
        <input className="hp" name="hp_dp7" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label className="consent">
          <input name="consentimento" type="checkbox" value="sim" required />
          <span>
            Declaro que li e aceito a <Link href="/politica-de-privacidade">Política de Privacidade</Link> para receber o
            resultado e ser contactado sobre ele, de acordo com o RGPD.
          </span>
        </label>
      </fieldset>

      <p className="diag__count">{respondidas} de {total} respostas</p>
      <button className="btn" type="submit" disabled={estado.kind === "sending"}>
        {estado.kind === "sending" ? "A enviar…" : "Ver o resultado"}
      </button>
      {estado.message && <p className={`form-status form-status--${estado.kind}`} role="status">{estado.message}</p>}
    </form>
  );
}
