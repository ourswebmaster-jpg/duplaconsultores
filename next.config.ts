import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URLs antigos do WordPress que podem estar partilhados por aí.
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/2025/10/duplaconsultores-brochura.pdf",
        destination: "/duplaconsultores-brochura.pdf",
        permanent: true,
      },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
