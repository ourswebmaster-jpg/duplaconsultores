import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import Diagnostico from "@/components/Diagnostico";

// Primeira peça do portal de formação-ação (29/10/2026). Fica fora do índice dos motores de busca e sem
// link na página inicial até o portal estar pronto.
export const metadata: Metadata = {
  title: "Diagnóstico de maturidade digital e IA",
  description: "Em 5 minutos, veja em que ponto está a sua empresa no digital e na inteligência artificial, e o próximo passo em cada área.",
  alternates: { canonical: "/diagnostico" },
  robots: { index: false, follow: false },
};

export default function DiagnosticoPage() {
  return (
    <LegalLayout title="Diagnóstico de maturidade digital e IA">
      <p>
        Em 5 minutos, veja em que ponto está a sua empresa em seis áreas, do site à inteligência artificial, e o próximo
        passo em cada uma. Responda com honestidade: não há respostas certas. No fim, recebe o resultado por email e
        pode falar connosco sobre ele.
      </p>
      <Diagnostico />
    </LegalLayout>
  );
}
