"use client";

import Link from "next/link";
import { useState } from "react";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Não foi possível enviar a mensagem.");
      form.reset();
      setStatus({ kind: "ok", message: "Obrigado! A sua mensagem foi enviada. Entraremos em contacto brevemente." });
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          (err instanceof Error ? err.message : "Não foi possível enviar a mensagem.") +
          " Pode escrever-nos diretamente para geral@duplaconsultores.pt.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="card">
        <h2 className="card__title">Fale connosco</h2>
        <label className="field">
          <span>Nome</span>
          <input name="nome" type="text" required maxLength={200} autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
        <label className="field">
          <span>Mensagem</span>
          <textarea name="mensagem" required maxLength={5000} rows={4} />
        </label>
        {/* Armadilha para bots: invisível para pessoas. */}
        <input className="hp" name="empresa" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>
      <div className="card">
        <button className="btn" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "A enviar…" : "Enviar"}
        </button>
        <label className="consent">
          <input name="consentimento" type="checkbox" value="sim" required />
          <span>
            Declaro que li e aceito a <Link href="/politica-de-privacidade">Política de Privacidade</Link> para efeitos
            de contacto e gestão da minha mensagem, de acordo com o Regulamento Geral de Proteção de Dados (RGPD).
          </span>
        </label>
        {status.message && (
          <p className={`form-status form-status--${status.kind}`} role="status">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
