import Link from "next/link";
import { ArrowDownIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a className="btn-outline" href="/duplaconsultores-brochura.pdf" download>
          <span className="btn-outline__icon">
            <ArrowDownIcon className="icon" />
          </span>
          <span className="btn-outline__text">Brochura</span>
        </a>
        <nav className="footer__legal" aria-label="Informação legal">
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
          <Link href="/politica-de-cookies">Política de Cookies</Link>
          <Link href="/termos-e-condicoes">Termos e Condições</Link>
        </nav>
        <img className="footer__symbol" src="/img/dupla_logo_simbolo.svg" alt="Dupla" width={50} height={55} />
      </div>
    </footer>
  );
}
