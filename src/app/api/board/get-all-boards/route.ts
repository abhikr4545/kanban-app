import SupabaseServerClient from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await SupabaseServerClient()

  try {
    const { data, error } = await supabase.from("boards").select("*");
    if(error) {
      return NextResponse.json({ message: error.message }, { status: 401 })
    } else {
      return NextResponse.json({ data }, { status: 201 })
    }

  } catch(error) {
    return NextResponse.json({ message: "Your request cannot be completed" }, { status: 500 })
  }
}