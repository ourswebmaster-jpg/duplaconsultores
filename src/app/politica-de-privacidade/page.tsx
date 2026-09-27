import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { privacidade } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Page() {
  return (
    <LegalLayout title="Política de Privacidade">
      <div dangerouslySetInnerHTML={{ __html: privacidade }} />
    </LegalLayout>
  );
}
