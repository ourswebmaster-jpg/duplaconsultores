import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços | Dupla Consultores",
};

const servicos = ["Serviço 1", "Serviço 2", "Serviço 3"];

export default function Servicos() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Serviços
      </h1>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {servicos.map((servico) => (
          <div key={servico} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
              {servico}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              [Placeholder] Descrição detalhada deste serviço.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
