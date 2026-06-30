import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Kunaal",
    description:
      "Portfolio of Boggavarapu Yuva Satya Kunaal — AI engineer, multi-agent systems builder and SaaS founder.",
    start_url: "/",
    display: "standalone",
    background_color: "#08070a",
    theme_color: "#08070a",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
