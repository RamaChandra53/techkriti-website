import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";

export const alt = `${siteConfig.name} — After Dark`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(`${process.cwd()}/public/branding/techkriti-splatter-white.png`);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #21121d, #0d0a12 72%)" }}>
      {/* This is the same transparent artwork used in the homepage hero. */}
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={1040} height={607} alt={alt} style={{ objectFit: "contain" }} />
    </div>,
    size,
  );
}
