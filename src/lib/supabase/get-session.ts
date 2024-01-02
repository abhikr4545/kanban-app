"use server";

import SupabaseServerClient from "./index";

export default async function getUserSession() {
  const supabase = await SupabaseServerClient();
  const session = await supabase.auth.getSession()
  return session;
}