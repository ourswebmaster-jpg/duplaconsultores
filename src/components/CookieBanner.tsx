"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

// O site não carrega analytics nem pixéis: só guarda a escolha, para a Política de Cookies
// (que promete "aceitar, recusar ou personalizar") continuar verdadeira. Se um dia entrar um
// script de terceiros, é aqui que se lê `dupla-cookies` antes de o carregar.
const KEY = "dupla-cookies";
const listeners = new Set<() => void>();

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return "indisponivel";
  }
}

function save(v: "aceite" | "recusado") {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export default function CookieBanner() {
  // No servidor devolve "pendente" para não desenhar o aviso antes de saber a escolha.
  const choice = useSyncExternalStore(subscribe, read, () => "pendente");
  if (choice !== null) return null;

  return (
    <div className="cookies" role="dialog" aria-labelledby="cookies-title">
      <button className="cookies__close" type="button" aria-label="Fechar" onClick={() => save("recusado")}>
        ×
      </button>
      <div className="cookies__head">
        <img src="/img/dupla_logo_simbolo.svg" alt="" width={48} height={53} />
        <h2 id="cookies-title">Cookies</h2>
      </div>
      <p>
        Este site utiliza cookies necessários para o seu correto funcionamento. Pode aceitá-los todos ou clicar em
        “saber mais” para escolher quais os cookies que aceita ou não.
      </p>
      <div className="cookies__links">
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        <Link href="/politica-de-cookies">Política de Cookies</Link>
      </div>
      <div className="cookies__actions">
        <button type="button" onClick={() => save("aceite")}>
          Aceitar
        </button>
        <button type="button" onClick={() => save("recusado")}>
          Recusar
        </button>
        <Link href="/politica-de-cookies">Saber mais</Link>
      </div>
    </div>
  );
}
