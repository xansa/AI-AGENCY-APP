import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  // Encode the zap/lightning bolt SVG as a data URI for use in ImageResponse,
  // since Satori doesn't support inline SVG elements directly.
  const zapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path d="M17.5 4L9 18h6l-2.5 10L21 14h-6z" fill="white"/></svg>`;
  const zapDataUri = `data:image/svg+xml,${encodeURIComponent(zapSvg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6366f1",
          borderRadius: "40px",
        }}
      >
        <img src={zapDataUri} width="110" height="110" />
      </div>
    ),
    { ...size }
  );
}
