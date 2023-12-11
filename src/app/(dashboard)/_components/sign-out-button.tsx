"use client";

import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await createSupabaseClientComponentClient().auth.signOut();
        router.push("/login");
      }}
      className="flex gap-5 items-center ring-1 ring-inset ring-[#939CC9]/10 rounded px-5 py-3 bg-[#181734] hover:bg-[#232252] transition-all"
    >
      Sign Out
    </button>
  );
}
