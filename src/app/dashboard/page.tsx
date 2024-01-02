"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import session from "@/lib/supabase/get-session";
import { toast } from "sonner";

export default function Dashboard() {

  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    const getUserSession = async () => {
      const user = await session()

      if(!user.data.session) {
        router.push("/");
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }

    getUserSession()
  },[])

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        }
      })
  
      if(!response.ok) {
        console.log("error")
      } else {
        router.replace("/")
      }
    } catch (error: any) {
      toast("Something went wrong", {
        description: error.message,
        cancel: {
          label: "x"
        }
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      Dashboards
      <Button disabled={isLoading} onClick={handleSignOut}>
        Sign out
      </Button>
    </main>
  )
}