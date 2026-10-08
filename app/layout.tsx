import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: "/", siteName: siteConfig.name, locale: "en_IN", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/opengraph-image"] }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0a12" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} font-sans antialiased`}><a href="#main" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-[#211521] px-5 py-3 font-bold text-white focus:translate-y-0">Skip to content</a><SiteHeader /><main id="main" className="w-full max-w-full overflow-x-clip">{children}</main><SiteFooter /></body></html>;
}
