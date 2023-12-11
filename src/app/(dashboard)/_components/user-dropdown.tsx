"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDropdown({
  avatarUrl,
  initials,
  name,
}: {
  name: string;
  avatarUrl: string;
  initials: string;
}) {
  const router = useRouter();
  const supabase = createSupabaseClientComponentClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-3 me-0">
        <Avatar className="h-9 w-auto">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();
            router.refresh();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
