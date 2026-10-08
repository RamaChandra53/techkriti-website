import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";

export const alt = `${siteConfig.name} After Dark — Halloween at MGIT, 16–17 October 2026`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ background: "#100b14", color: "#fff", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, fontFamily: "sans-serif", border: "14px solid #ff7938" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, letterSpacing: 4 }}><span>{siteConfig.shortName}</span><span>MGIT · HYDERABAD</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: .82, letterSpacing: -6, fontWeight: 900 }}><span>AFTER</span><span style={{ color: "#ff7938" }}>DARK.</span><span style={{ fontSize: 34, letterSpacing: 8, marginTop: 16 }}>A HALLOWEEN SPECIAL</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700 }}><span>16—17 OCTOBER 2026</span><span>{siteConfig.shortName}</span></div></div>, size); }
