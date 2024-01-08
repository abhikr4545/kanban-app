import { NextRequest, NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function DELETE(request: NextRequest) {
  const { taskId, updatedTasks } = await request.json()
  const supabase = await SupabaseServerClient();

  try {
    const { error } = await supabase.from("task_card").delete().eq("id", taskId);

    if(error) {
      return NextResponse.json({ message: "Your request cannot be completed" }, { status: 404 })
    }

    for(const task of updatedTasks) {
      const { error } = await supabase.from("task_card").update({ position: task.position }).eq("id", task.id)

      if(error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 404 })
      }
    }

    return NextResponse.json({ message: "Success" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}