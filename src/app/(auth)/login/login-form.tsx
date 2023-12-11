"use client";

import { Button } from "@/components/ui/button";
import { toSiteUrl } from "@/lib/helper";
import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import { SocialIcon } from "react-social-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/assets/logo.jpeg";

export default function LoginForm() {
  const supabase = createSupabaseClientComponentClient();

  const onClick = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: toSiteUrl("/auth/callback"),
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-10 flex flex-col items-center">
        <CardHeader>
          <CardTitle>
            <Image
              priority
              src={Logo}
              width={200}
              height={200}
              alt="LeggyLair Guardian"
              className="rounded-full"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <span className="text-m font-semibold mb-3">Sign in with</span>
          <Button onClick={onClick} size={"lg"}>
            <div className="flex items-center gap-2">
              <SocialIcon network="github" style={{ height: 32, width: 32 }} />
              <span>Sign in with github</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
