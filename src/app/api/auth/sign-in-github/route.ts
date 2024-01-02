import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import SupabaseServerClient from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? '/'

  if(code) {
    const cookieStore = cookies();
    const supabase = await SupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if(!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}