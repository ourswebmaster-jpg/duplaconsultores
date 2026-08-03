export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Dupla Consultores. Todos os direitos reservados.</p>
        <p>duplaconsultores.pt</p>
      </div>
    </footer>
  );
}
