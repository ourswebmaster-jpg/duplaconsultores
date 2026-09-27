import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { cookies } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Cookies",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function Page() {
  return (
    <LegalLayout title="Política de Cookies">
      <div dangerouslySetInnerHTML={{ __html: cookies }} />
    </LegalLayout>
  );
}
