import { NextResponse, NextRequest } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { currentBoardId } = await request.json();
  const supabase =  await SupabaseServerClient();
  const { data, error } = await supabase.from("task_card").select("*").eq("board_id", currentBoardId);

  if(error) {
    return NextResponse.json({ message: "Your request cannot be completed." }, { status: 404 })
  }

  return NextResponse.json({ data, message: "Recieved" }, { status: 201 });
}