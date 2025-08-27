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
    const { data, error } = await supabase
      .from("inscritos")
      .insert(pessoas)
      .select(`
        data,nome_pessoa,
        cargos (
          nome
        ),
        clubes(
          nome
        )
        `)

    if (error) throw error

    return data
  }

  return {
    listarClubes,
    listarCargos,
    guardarPessoas,
  }
}
