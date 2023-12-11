import { createSupabaseRouteHandlerClient } from "@/lib/supabase-server-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createSupabaseRouteHandlerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.log(error);
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
