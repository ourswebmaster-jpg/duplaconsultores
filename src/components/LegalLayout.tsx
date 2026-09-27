import Link from "next/link";
import Footer from "./Footer";
import { ArrowLeftIcon } from "./icons";

export default function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="legal-header">
        <Link href="/" className="legal-header__back" aria-label="Voltar à página inicial">
          <ArrowLeftIcon className="icon" />
        </Link>
        <Link href="/" aria-label="Dupla Consultores — página inicial">
          <img src="/img/dupla_logo_horizontal.svg" alt="Dupla Consultores" width={150} height={45} />
        </Link>
      </header>
      <main className="legal">
        <h1>{title}</h1>
        {children}
      </main>
      <Footer />
    </>
  );
}
