import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminUser = process.env.ADMIN_BASIC_AUTH_USER;
  const adminPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!adminUser || !adminPassword) {
    return new NextResponse("Admin credentials are not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  const credentials = Buffer.from(authHeader.split(" ")[1], "base64").toString("utf8");
  const [user, password] = credentials.split(":");

  if (user !== adminUser || password !== adminPassword) {
    return new NextResponse("Unauthorized.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
