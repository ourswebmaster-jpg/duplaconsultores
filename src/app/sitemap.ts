import type { MetadataRoute } from "next";

const BASE = "https://duplaconsultores.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/politica-de-privacidade", "/politica-de-cookies", "/termos-e-condicoes"].map((p) => ({
    url: BASE + p,
  }));
}
