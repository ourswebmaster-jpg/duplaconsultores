import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Dupla Consultores",
};

export default function Sobre() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Sobre
      </h1>
      <p className="mt-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
        [Placeholder] História, missão e valores da Dupla Consultores — a
        substituir por conteúdo real.
      </p>
    </div>
  );
}
