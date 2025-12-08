"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const router = useRouter();
  
    const logout = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/auth/login");
    };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}
      {/* <Button
        variant="outline"
        onClick={() => supabase.auth.signOut()}
      >
      </Button> */}
      <Button onClick={logout} variant = "outline" className="justify-start">Logout</Button>;
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
