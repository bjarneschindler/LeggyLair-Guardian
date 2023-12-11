import LoginForm from "./login-form";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";

export default async function LoginPage() {
  const {
    data: { session },
  } = await createSupabaseServerClient().auth.getSession();

  console.log(session);

  return <LoginForm />;
}
