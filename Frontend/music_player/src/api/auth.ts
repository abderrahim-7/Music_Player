import { supabase } from "./supabase";

export async function register(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  
  if (error) throw new Error(error.message);
  
  return data.user;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) throw new Error(error.message);
  
  return data.user;
}