import { Separator } from "@/components/ui/separator";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const initials = user?.user_metadata.name.split(" ").map((n: string) => n[0]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="flex flex-col py-5">{children}</main>
    </div>
  );
}
