import { NextRequest, NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const supabase = await SupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if(error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
  }

  return NextResponse.json({ message: "Signed in" }, { status: 201 })
}