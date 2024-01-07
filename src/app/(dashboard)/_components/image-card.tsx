"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const supabase = createSupabaseClientComponentClient();

export default function ImageCard({
  initialImageData,
}: {
  initialImageData: { data: string | null; created_at: string };
}) {
  const [imageData, setImageData] = useState(initialImageData);

  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "images",
        },
        (payload) => {
          console.time("new image");
          if (payload.new.data) setImageData(payload.new as any);
        }
      )
      .subscribe();
  }, []);

  return (
    <Card className="w-fit flex flex-col relative col-span-3 xl:col-span-2">
      <CardHeader>
        <CardTitle>Image Feed</CardTitle>
        <CardDescription>
          Last image captured:{" "}
          {imageData && new Date(imageData.created_at).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageData?.data ? (
          <Image
            width={1280}
            height={720}
            className="rounded-xl"
            alt="The thing to be seen"
            src={`data:image/png;base64,${imageData.data}`}
          />
        ) : (
          <span className="flex justify-center p-20 text-3xl text-gray-100/10">
            No Image Data Available
          </span>
        )}
      </CardContent>
    </Card>
  );
}
