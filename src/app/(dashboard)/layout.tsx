import { Separator } from "@/components/ui/separator";
import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import UserDropdown from "./_components/user-dropdown";
import Logo from "./_components/logo";

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
      <header className="flex justify-between py-2 items-center">
        <Logo />
        <UserDropdown
          name={user?.user_metadata.name}
          avatarUrl={user?.user_metadata.avatar_url}
          initials={initials}
        />
      </header>
      <Separator />
      <main className="flex flex-col py-5">{children}</main>
    </div>
  );
}
