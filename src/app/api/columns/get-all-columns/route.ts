import { NextResponse, NextRequest } from "next/server"
import SupabaseServerClient from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const  { currentBoardId } = await request.json();
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.from("task_column").select("id, name, position").eq("board_id", currentBoardId);

  if(error) {
    return NextResponse.json({ message: "Somethhing went wrong" }, { status: 401 })
  }

  return NextResponse.json({ data }, { status: 201 })
}