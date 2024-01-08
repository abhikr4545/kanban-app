import { NextRequest, NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function DELETE(request: NextRequest) {
  const { columnId, updatedColumns } = await request.json();
  const supabase = await SupabaseServerClient();

  try {

    for(const column of updatedColumns) {
      const { error } = await supabase.from("task_column").update({ position: column.position }).eq("id", column.id)

      if(error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 404 })
      }
    }

    const { error } = await supabase.from("task_column").delete().eq("id", columnId);

    if(error) {
      return NextResponse.json({ message: "There was some error" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted Successfully" }, { status: 201 });
  } catch(error) {
    return NextResponse.json({ message: "There was some error" }, { status: 500 });
  }
}