import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "./lib/supabase-server-client";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createSupabaseMiddlewareClient({ request, response });
  const { data } = await supabase.auth.getSession();
  const { pathname, origin } = request.nextUrl;
  const isAuth = data?.session ?? false;
  const isAuthPage =
    pathname.startsWith("/auth") || pathname.startsWith("/login");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(`${origin}/`);
    }

    return response;
  }

  if (!isAuth) {
    return NextResponse.redirect(`${origin}/login`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
