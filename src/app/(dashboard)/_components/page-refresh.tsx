"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageRefresh() {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return null;
}
