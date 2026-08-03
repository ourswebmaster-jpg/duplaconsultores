import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactos | Dupla Consultores",
};

export default function Contactos() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Contactos
      </h1>
      <div className="mt-6 flex flex-col gap-2 text-zinc-600 dark:text-zinc-400">
        <p>[Placeholder] email@duplaconsultores.pt</p>
        <p>[Placeholder] +351 000 000 000</p>
        <p>[Placeholder] Morada</p>
      </div>
    </div>
  );
}
