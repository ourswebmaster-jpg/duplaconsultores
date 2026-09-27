import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";

export default function NotFound() {
  return (
    <LegalLayout title="Página não encontrada">
      <p>
        A página que procura não existe. <Link href="/">Voltar à página inicial</Link>.
      </p>
    </LegalLayout>
  );
}
