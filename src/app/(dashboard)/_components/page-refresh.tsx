"use client";

import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const supabase = createSupabaseClientComponentClient();

export default function PageRefresh() {
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public" },
        router.refresh
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  });

  return null;
}
