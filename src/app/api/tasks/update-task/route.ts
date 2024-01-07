import { NextRequest, NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function PATCH(request: NextRequest) {
  const supabase = await SupabaseServerClient()

  const { type, newColumnTasks, newStartColumnTasks, newEndColumnTasks, } = await request.json();

  if(type === "SAME_COLUMN") {
    for(const task of newColumnTasks) {
      const { data, error } = await supabase.from("task_card").update({ task_column_id: task.task_column_id, position: task.position }).eq("id", task.id).select()

      if(error) {
        return NextResponse.json({ message: "Something went wrong changes will be reverted on next refresh" }, { status: 404 });
      }
    }
  }

  if(type === "DIFFERENT_COLUMN") {
    console.log("Start column ->", newStartColumnTasks);
    console.log("End Column ->", newEndColumnTasks)

    for(const task of newStartColumnTasks) {
      const { error } = await supabase.from("task_card").update({ task_column_id: task.task_column_id, position: task.position }).eq("id", task.id).select()

      if(error) {
        return NextResponse.json({ message: "Something went wrong changes will be reverted on next refresh" }, { status: 404 });
      }
    }

    for(const task of newEndColumnTasks) {
      const { error } = await supabase.from("task_card").update({ task_column_id: task.task_column_id, position: task.position }).eq("id", task.id).select()

      if(error) {
        return NextResponse.json({ message: "Something went wrong changes will be reverted on next refresh" }, { status: 404 });
      }
    }
  }

  return NextResponse.json({ message: "Success" }, { status: 201 })
}