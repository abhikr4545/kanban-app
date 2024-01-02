import  SupabaseServerClient from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await SupabaseServerClient()

  const { error } = await supabase.auth.signOut();

  if(error) {
    return NextResponse.json({ message: error.message }, { status: 404 })
  }

  return NextResponse.json({ message: "User Signed out" }, { status: 201 });
}