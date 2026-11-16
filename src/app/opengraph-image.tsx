"use client";

import { ImageResponse } from "next/og";

export const alt = "ELEVN — Create a Fashion Vibe. Minimal fashion for everyday confidence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://elevn.vercel.app";
  const male = origin + "/images/ChatGPT%20Image%20Nov%2016,%202026,%2005_06_18%20PM.png";
  const female = origin + "/images/ChatGPT%20Image%20Nov%2016,%202026,%2005_06_31%20PM.png";

  return new ImageResponse(
    (
      <div style={{ width: "1200px", height: "630px", display: "flex", position: "relative", overflow: "hidden", background: "#f7f7ef", color: "#111111", fontFamily: "Arial, sans-serif" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "radial-gradient(circle at 80% 48%, rgba(198,247,53,.24), transparent 34%)" }} />
        <div style={{ position: "relative", zIndex: 2, width: "58%", padding: "54px 0 48px 72px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 900, letterSpacing: "-2px" }}>ELEVN<span style={{ color: "#ff3399" }}>.</span></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, lineHeight: 0.91, fontWeight: 900, letterSpacing: "-5px" }}>CREATE A</div>
            <div style={{ display: "flex", fontSize: 88, lineHeight: 0.91, fontWeight: 900, letterSpacing: "-5px", color: "transparent", WebkitTextStroke: "2px #111111" }}>FASHION</div>
            <div style={{ display: "flex", fontSize: 88, lineHeight: 0.91, fontWeight: 900, letterSpacing: "-5px" }}>VIBE<span style={{ color: "#c6f735" }}>.</span></div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 25, color: "#555555" }}>Minimal fashion designed for everyday confidence.</div>
          </div>
          <div style={{ display: "flex", fontSize: 18, fontWeight: 700, letterSpacing: "4px" }}>MEN  /  WOMEN  /  EVERYDAY STYLE</div>
        </div>
        <div style={{ position: "absolute", right: 4, bottom: -25, width: 570, height: 620, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <img src={female} width="360" height="600" style={{ objectFit: "contain", objectPosition: "bottom", position: "absolute", right: 0, bottom: 0 }} />
          <img src={male} width="440" height="610" style={{ objectFit: "contain", objectPosition: "bottom", position: "absolute", right: 180, bottom: 0 }} />
        </div>
        <div style={{ position: "absolute", right: 55, top: 48, display: "flex", borderRadius: 999, background: "#c6f735", padding: "12px 20px", fontSize: 14, fontWeight: 800, letterSpacing: "2px" }}>EXPLORE ELEVN</div>
      </div>
    ),
    { ...size },
  );
}
