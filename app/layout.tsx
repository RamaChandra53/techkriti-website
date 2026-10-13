import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { siteConfig } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const halloween = localFont({ src: "./fonts/HALLOWEEN.ttf", variable: "--font-halloween", display: "swap", weight: "400" });
const robotoSlab = localFont({ src: "./fonts/RobotoSlab-Variable.ttf", variable: "--font-roboto-slab", display: "swap", weight: "100 900" });
const clarityProjectId = process.env.VERCEL_ENV === "production" ? "yx6s0sb8w1" : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: "/", siteName: siteConfig.name, locale: "en_IN", type: "website", images: [{ url: "/opengraph-image?preview=square-mark-2026", width: 1200, height: 630, alt: "Techkriti square Halloween logo" }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/opengraph-image?preview=square-mark-2026"] }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0a12" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${halloween.variable} ${robotoSlab.variable} font-sans antialiased`}><a href="#main" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-[#211521] px-5 py-3 font-bold text-white focus:translate-y-0">Skip to content</a><SiteHeader /><main id="main" className="w-full max-w-full overflow-x-clip">{children}</main><Analytics />{clarityProjectId && <Script id="microsoft-clarity" strategy="afterInteractive">{`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",${JSON.stringify(clarityProjectId)});
  `}</Script>}</body></html>;
}
