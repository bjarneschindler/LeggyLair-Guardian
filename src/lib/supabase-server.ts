import { createServerClient } from "@supabase/ssr";
import { SupabaseClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import { cookies } from "next/headers";

const cookieStore = cookies();

const createSupabaseClient = (options?: SupabaseClientOptions<"public">) =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      ...options,
    }
  );

export default createSupabaseClient;
