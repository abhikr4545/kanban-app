import SupabaseServerClient from "@/lib/supabase/";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const { boardname } = await request.json()
  const supabase = await SupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  try {

    const { data: existingBoard, error: existingBoardError } = await supabase.from("boards").select()
    .eq("board_name", boardname).eq("user_id", user?.id);

    if(existingBoard?.length! > 0 || existingBoardError) {
      const message = existingBoardError ? existingBoardError.message : "Board name already present";
      const status = existingBoardError ? 500 : 409;
      return NextResponse.json({ message }, { status })
    }

    const { data, error } = await supabase.from("boards").insert({ id: nanoid(), user_id: user?.id, board_name: boardname }).select()
    if(error) {
      return NextResponse.json({ message: "Board name already present" }, { status: 409 })
    }
    return NextResponse.json({ data }, { status: 201 })

  } catch(error) {
    return NextResponse.json({ message: "Your request cannot be completed" }, { status: 500 })
  }
}