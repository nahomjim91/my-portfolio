import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "Selihom – Full-Stack Developer & UI/UX Designer",
  description: "Premium portfolio showcasing development and design work with smooth animations and dark mode.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Selihom Portfolio",
    description: "Full-Stack Developer & UI/UX Designer",
    url: "https://example.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}