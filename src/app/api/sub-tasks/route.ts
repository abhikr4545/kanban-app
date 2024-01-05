import { NextRequest, NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { taskCardId } = await request.json();
  const supabase = await SupabaseServerClient()
  try {
    const { data, error } = await supabase.from("subtask_list").select("id, is_completed, name").eq("task_card_id", taskCardId);

    if(error) {
      return NextResponse.json({ message: "Some error occured" }, { status: 401 })
    }

    return NextResponse.json({ data, message: "Success" }, { status: 201 })
  } catch(error) {
    console.log(error)
    return NextResponse.json({ message: "Your request cannot be completed" }, { status: 501 })
  }
}

export async function PATCH(request: NextRequest) {
  const { changes } = await request.json();
  const supabase = await SupabaseServerClient()

  console.log("from server ->", changes);
  
  for(const change of changes) {
    try {
      const { error } = await supabase.from("subtask_list").update({ is_completed: change.is_completed }).eq("id", change.id);

      if(error) {
        return NextResponse.json({ message: "Cannot complete your request at this moment" }, { status: 400 })
      }

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Cannot complete your request at this moment" }, { status: 400 })
    }
  }

  return NextResponse.json({ message: "Subtask updated" }, { status: 201 });
}