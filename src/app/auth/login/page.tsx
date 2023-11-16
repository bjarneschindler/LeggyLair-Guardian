"use client";

import { Auth } from "@supabase/auth-ui-react";
import browserClient from "@/lib/supabase-browser";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Auth
        appearance={{ theme: ThemeSupa }}
        supabaseClient={browserClient}
        providers={["github"]}
        theme="dark"
        redirectTo="/"
        onlyThirdPartyProviders
      />
    </div>
  );
}
