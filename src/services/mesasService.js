import { supabase } from "./supabaseClient";

export const getMesas = async () => {
  const { data, error } = await supabase
    .from("mesas")
    .select("*");
  return { data, error };
};

export const getMesaById = async (id) => {
  const { data, error } = await supabase
    .from("mesas")
    .select("*")
    .eq("id", id);
  return { data, error };
};
