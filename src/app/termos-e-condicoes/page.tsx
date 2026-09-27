import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { termos } from "@/content/legal";

export const metadata: Metadata = {
  title: "Termos e Condições",
  alternates: { canonical: "/termos-e-condicoes" },
};

export default function Page() {
  return (
    <LegalLayout title="Termos e Condições">
      <div dangerouslySetInnerHTML={{ __html: termos }} />
    </LegalLayout>
  );
}
