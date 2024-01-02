"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import session from "@/lib/supabase/get-session";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import TaskColumnContainer from "@/components/task-column-container";

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

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <main>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <TaskColumnContainer />
      </div>
    </main>
  )
}