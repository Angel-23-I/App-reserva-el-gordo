import { supabase } from "./supabaseClient";

export const getReservas = async () => {
  const { data, error } = await supabase.from("reservas").select("*").order("created_at", { ascending: false });
  return { data, error };
};

export const getReservasByMesa = async (mesaId, fecha, hora) => {
  const { data, error } = await supabase
    .from("reservas")
    .select("*")
    .eq("mesa_id", mesaId)
    .eq("fecha", fecha)
    .eq("hora", hora)
    .eq("estado", "activa");
  return { data, error };
};

export const createReserva = async (reserva) => {
  const { data, error } = await supabase.from("reservas").insert([reserva]).select();
  return { data, error };
};

export const cancelReserva = async (id) => {
  const { data, error } = await supabase
    .from("reservas")
    .update({ estado: "cancelada" })
    .eq("id", id)
    .select();
  return { data, error };
};