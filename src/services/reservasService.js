import { supabase } from "./supabaseClient";

export const createReserva = async (payload) => {
  const { data, error } = await supabase.from("reservas").insert([payload]).select();
  return { data, error };
};

export const getReservas = async () => {
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
};

export const cancelReserva = async (id) => {
  const { data, error } = await supabase.from("reservas").update({ estado: "cancelada" }).eq("id", id).select();
  return { data, error };
};

export const getReservasByDateTime = async (fecha, hora) => {
  const { data, error } = await supabase
    .from("reservas")
    .select("id, mesa_id, fecha, hora, estado")
    .eq("fecha", fecha)
    .eq("hora", `${hora}:00`)
    .eq("estado", "activa");
  return { data, error };
};

export const getReservasByDate = async (fecha) => {
  const { data, error } = await supabase
    .from("reservas")
    .select("id, mesa_id, fecha, hora, estado")
    .eq("fecha", fecha)
    .eq("estado", "activa");
  return { data, error };
};