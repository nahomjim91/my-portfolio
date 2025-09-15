import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://selihom.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date() },
  ];
}