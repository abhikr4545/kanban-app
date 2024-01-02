"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBoardContext } from "@/context/BoardContext";
import CreateTaskModal from "../modals/create-task";
// import { useColumnContext } from "@/context/ColumnContext";

export default function Navbar() {

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()
  const { currentBoardName, currentBoardId } = useBoardContext();
  // const { columns } = useColumnContext();

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
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="h-[56px] w-screen bg-main-background flex text-smoky-black">
      <div className="flex gap-1 border-r-2 h-full min-w-[270px] border-r-border-color items-center pl-6">
        <Link href="/" className="flex gap-1">
          <div className="bg-bleu-de-france h-[24px] w-[5px] rounded-lg"></div>
          <div className="bg-bleu-de-france h-[24px] w-[5px] rounded-lg"></div>
          <div className="bg-bleu-de-france h-[24px] w-[5px] rounded-lg"></div>
        </Link>
        <div className="text-xl font-bold ml-2">kanban</div>
      </div>
      <div className="w-full flex justify-between items-center border-b-2 border-b-border-color px-6">
        <div className="font-bold text-xl">
          {currentBoardName || "Select a board"}
        </div>
        <div className="flex items-center gap-4">
          {/* {(currentBoardId && columns.length > 0) ? <CreateTaskModal /> : <div></div>} */}
          <CreateTaskModal />
          <Button disabled={loading} onClick={handleSignOut}>Sign out</Button>
        </div>
      </div>
    </nav>
  )
}