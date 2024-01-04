import SupabaseServerClient from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const supabase = await SupabaseServerClient();
  const { columns } = await request.json()

  for(const column of columns) {
    const { error } = await supabase.from("task_column").update({ position: column.position }).eq("id", column.id).select();

    if(error) {
      console.log(error)
      return NextResponse.json({ message: "Something went wrong" }, { status: 404 })
    }
  }

  return NextResponse.json({ message: "OK" }, { status: 201 })
}