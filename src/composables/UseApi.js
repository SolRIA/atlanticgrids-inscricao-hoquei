import useSupabase from "src/boot/supabase"

export default function useApi() {
  const { supabase } = useSupabase()

  const listarClubes = async () => {
    const { data, error } = await supabase
      .from("clubes")
      .select("id, nome")
      .order("nome")

    if (error) throw error

    return data
  }

  const listarCargos = async () => {
    const { data, error } = await supabase
      .from("cargos")
      .select("id, nome")
      .order("ordem")

    if (error) throw error

    return data
  }

  const guardarPessoas = async (pessoas) => {
    const { error } = await supabase
      .from("inscritos")
      .insert(pessoas)

    if (error) throw error
  }

  return {
    listarClubes,
    listarCargos,
    guardarPessoas,
  }
}
