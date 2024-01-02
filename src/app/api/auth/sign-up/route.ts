import  SupabaseServerClient  from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const supabase = await SupabaseServerClient()

  const { error } = await supabase.auth.signUp({ email, password });

  if(error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ message: "User created" }, { status: 201 });
}