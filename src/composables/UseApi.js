import useSupabase from "src/boot/supabase";

export default function useApi() {
  const { supabase } = useSupabase();

  const listarClubes = async () => {
    const { data, error } = await supabase.from("clubes").select("*");

    if (error) throw error;

    return data;
  };

  const listarCargos = async () => {
    const { data, error } = await supabase.from("cargos").select("*");

    if (error) throw error;

    return data;
  };

  const guardarPessoa = async (nome_pessoa, cargo_id, clube_id) => {
    const { data, error } = await supabase.from("inscritos").insert([
      {
        nome_pessoa,
        cargo_id,
        clube_id,
      },
    ]);
    if (error) throw error;
    return data;
  };

  return {
    listarClubes,
    listarCargos,
    guardarPessoa,
  };
}
