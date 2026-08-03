import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
      <section className="flex flex-1 flex-col items-start justify-center gap-6 py-24">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
          Dupla Consultores
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          [Placeholder] Uma frase curta sobre o que a Dupla Consultores faz e
          para quem — a substituir por conteúdo real.
        </p>
        <Link
          href="/contactos"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Fale connosco
        </Link>
      </section>

      <section className="grid gap-6 border-t border-black/[.08] py-16 sm:grid-cols-3 dark:border-white/[.145]">
        {["Serviço 1", "Serviço 2", "Serviço 3"].map((service) => (
          <div key={service} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
              {service}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              [Placeholder] Descrição breve deste serviço.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
