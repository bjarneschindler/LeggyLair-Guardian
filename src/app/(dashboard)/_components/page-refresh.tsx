"use client";

import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const supabase = createSupabaseClientComponentClient();

export default function PageRefresh() {
  const router = useRouter();
  const lastRefresh = useRef(Date.now());

  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_data" },
        () => {
          console.log("Reload page");
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  });

  return null;
}
