import { NextRequest, NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const { taskContainerName, boardId, position } = await request.json();
  const supabase = await SupabaseServerClient();
  try {
    const { data: existingColumn, error: existingColumnError } = await supabase.from("task_column").select()
    .eq("name", taskContainerName).eq("board_id", boardId);

    if(existingColumn?.length! > 0 || existingColumnError) {
      const message = existingColumnError ? existingColumnError.message : "Column name already present";
      const status = existingColumnError ? 500 : 409;
      return NextResponse.json({ message }, { status })
    }

    const { data, error } = await supabase.from("task_column")
    .insert({ id: nanoid(), name: taskContainerName, board_id: boardId, position: position }).select()
    
    if(error) {
      return NextResponse.json({ message: "Oops something went wrong!" }, { status: 400 });
    } else {
      return NextResponse.json({ data }, { status: 201 })
    }
  } catch(error) {
    return NextResponse.json({ message: "Server cannot process your request. Please try after sometime." }, { status: 500 });
  }
}