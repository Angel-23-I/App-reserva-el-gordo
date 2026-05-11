// src/services/horariosService.js
import { supabase } from "./supabaseClient";

export const getHorarios = async () => {
  const { data, error } = await supabase.from("horarios").select("*").order("dia_semana");
  return { data, error };
};

export const updateHorario = async (id, updates) => {
  const { data, error } = await supabase.from("horarios").update(updates).eq("id", id).select();
  return { data, error };
};