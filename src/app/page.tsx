import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { ArrowDownIcon, CheckIcon, PhoneIcon } from "@/components/icons";

const SANDRA = [
  "Planeamento estratégico",
  "Gestão de marca",
  "Marketing digital",
  "Publicidade digital",
  "Recursos humanos",
  "Medias digitais",
];

const HELDER = [
  "Branding",
  "Visual design",
  "Web Design",
  "App Design",
  "E-commerce",
  "Packaging Design",
  "Editorial Design",
  "Front-End development",
];

function Skills({ items, tone }: { items: string[]; tone: "purple" | "yellow" }) {
  return (
    <ul className={`skills skills--${tone}`}>
      {items.map((s) => (
        <li key={s}>
          <CheckIcon className="skills__check" />
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <header className="header">
        <Link href="/" aria-label="Dupla Consultores — página inicial">
          <img
            className="header__logo"
            src="/img/dupla_logo_horizontal.svg"
            alt="Dupla Consultores"
            width={220}
            height={65}
          />
        </Link>
        <nav>
          <a className="header__link" href="#contactos">
            Contactos
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero__art">
            <picture>
              <source media="(max-width: 800px)" srcSet="/img/helder-sandra-mob.webp" />
              <img
                className="photo hero__photo"
                src="/img/helder-sandra.webp"
                alt="Helder Santos e Sandra Regala, Dupla Consultores"
                fetchPriority="high"
              />
            </picture>
            <img className="shape hero__shape-sandra" src="/img/dupla_shape_sandra.png" alt="" aria-hidden="true" />
            <img className="shape hero__shape-helder" src="/img/dupla_shape_helder.png" alt="" aria-hidden="true" />
          </div>
          <div className="hero__text">
            <h1 className="display">
              Uma dupla <br className="br-desk" />
              estratégica <br className="br-desk" />e criativa
            </h1>
            <p className="lead">
              Somos uma dupla 360º – mas isso não significa que temos de ir à sua empresa sempre os dois. Pode trabalhar
              só com o Hélder, só com a Sandra, ou connosco em conjunto – depende do desafio. Adaptamo-nos ao que a sua
              empresa precisa.
              <br />
              Sem pacotes fechados. Sem complicações.
            </p>
            <a className="btn" href="#sobre">
              Saiba mais <ArrowDownIcon className="btn__icon" />
            </a>
          </div>
        </section>

        <section className="person person--sandra" id="sobre">
          <div className="person__art">
            <img className="photo" src="/img/sandra-dupla-bk.webp" alt="Sandra Regala, Dupla Consultores" loading="lazy" />
            <img className="shape person__shape" src="/img/dupla_shape_sandra.png" alt="" aria-hidden="true" />
          </div>
          <div className="person__text">
            <h2 className="title">Estratégia, Gestão de Informação, Marketing e Recursos Humanos</h2>
            <p className="lead">Ideal para reposicionar marcas, formar equipas, alinhar comunicação e cultura.</p>
            <p className="body person__bio">
              <strong className="name">Sandra Regala</strong> é Marketeer e Diretora comercial com mais de 7 anos de
              experiência. Criadora de estratégias de marketing, gestão de conteúdos digitais, storytelling e
              copywriting.
            </p>
            <Skills items={SANDRA} tone="purple" />
          </div>
        </section>

        <section className="person person--helder">
          <div className="person__art">
            <img className="photo" src="/img/helder-dupla-bk.webp" alt="Helder Santos, Dupla Consultores" loading="lazy" />
            <img className="shape person__shape" src="/img/dupla_shape_helder.png" alt="" aria-hidden="true" />
          </div>
          <div className="person__text">
            <h2 className="title">Design, Tecnologia, Transformação Digital e Projeto</h2>
            <p className="lead">
              Ideal para criar (ou renovar) uma marca, tornar tudo mais apelativo e coerente no físico e digital.
            </p>
            <p className="body person__bio">
              <strong className="name">Helder Santos</strong> é Designer com mais de 15 anos de experiência na criação
              de conteúdos digitais inovadores e 5 anos como Consultor de Marketing Digital.
            </p>
            <Skills items={HELDER} tone="yellow" />
          </div>
        </section>

        <section className="contact" id="contactos">
          <picture className="contact__stripes">
            <source media="(max-width: 800px)" srcSet="/img/bg-dupla-cut-mob.svg" />
            <img src="/img/bg-dupla-cut.svg" alt="" />
          </picture>
          <div className="contact__text">
            <h2 className="display">Quando o desafio precisa de visão 360º</h2>
            <p className="lead">Ideal para lançamentos de marca, reformulações completas, planos de ação integrados.</p>
            <p className="body">
              Uma dupla. Três formas de trabalhar. Só precisas de uma nova imagem? Fala com o Hélder. Precisas de pôr
              ordem na casa e nas ideias? Marca com a Sandra. Precisas de tudo? Então fala com a DUPLA.
            </p>
            <p className="body contact__email">
              <a href="mailto:geral@duplaconsultores.pt">geral@duplaconsultores.pt</a>
            </p>
            <a className="btn-outline btn-outline--big" href="tel:+351919663127">
              <span className="btn-outline__icon">
                <PhoneIcon className="icon" />
              </span>
              <span className="btn-outline__text">919 663 127</span>
            </a>
          </div>
          <div className="contact__form">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
