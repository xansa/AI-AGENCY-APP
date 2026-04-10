import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECT_HOSTS = [
  "arkadigitaal.nl",
  "www.arkadigitaal.nl",
  "arkadigitaal.online",
  "www.arkadigitaal.online",
  "arkagroup.nl",
  "www.arkagroup.nl",
];

const PRIMARY_HOST = "arkadigital.nl";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.replace(/:\d+$/, "");

  if (host && REDIRECT_HOSTS.includes(host)) {
    const url = new URL(request.url);
    url.host = PRIMARY_HOST;
    url.port = "";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|icon.svg|brand/).*)",
};
