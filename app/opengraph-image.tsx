import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Arka | Jouw digitale afdeling, zonder de overhead.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#4F46E5",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-2px",
            }}
          >
            Arka
            <span style={{ color: "#4F46E5" }}>.</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          Jouw digitale afdeling, zonder de overhead.
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "16px",
            color: "#64748B",
            display: "flex",
            gap: "24px",
          }}
        >
          <span>Websites</span>
          <span>·</span>
          <span>SEO</span>
          <span>·</span>
          <span>AI Chatbots</span>
          <span>·</span>
          <span>Dashboards</span>
          <span>·</span>
          <span>Lead Gen</span>
          <span>·</span>
          <span>Branding</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
