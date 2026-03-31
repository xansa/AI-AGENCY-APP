import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          borderRadius: "40px",
        }}
      >
        <svg
          viewBox="0 0 512 512"
          width="130"
          height="130"
          style={{ display: "flex" }}
        >
          <path
            d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z"
            fill="#3B82F6"
          />
          <path d="M256 300 L214 400 H298 Z" fill="#0F172A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
