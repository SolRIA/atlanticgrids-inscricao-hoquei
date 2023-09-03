<template>
  <q-page>
    <div class="row justify-center q-ma-xl">
      <img
        alt="APA"
        src="~assets/APA.webp"
        class="col-12"
        style="width: 200px"
      />
      <img
        alt="APACA"
        src="~assets/APA_APACA.jpg"
        class="col-12"
        style="width: 200px"
      />
    </div>

    <div class="row justify-center q-ma-xl">
      <q-card class="q-pa-lg" style="width: 650px">
        <q-card-section>
          <div class="row">
            <q-select
              v-model="clube"
              :options="clubes"
              option-value="id"
              option-label="nome"
              ref="inputClubs"
              label="Clube"
              outlined
              class="col-12"
              :rules="[(val) => val !== null || 'Escolha um clube']"
            />
          </div>
        </q-card-section>

        <q-card-section>
          <q-table
            class="q-mt-sm"
            color="positive"
            title="Participantes"
            no-data-label="Sem dados"
            row-key="id"
            hide-bottom
            :rows="pessoas"
            :columns="columns"
          >
            <template v-slot:top-right>
              <q-btn color="primary" dense icon="add" @click="adicionaPessoa" />
            </template>

            <template v-slot:body-cell-nome="props">
              <q-td :props="props">
                <q-input v-model="props.row.nome" borderless />
              </q-td>
            </template>

            <template v-slot:body-cell-cargo_id="props">
              <q-td :props="props">
                <q-select
                  v-model="props.row.cargo_id"
                  :options="cargos"
                  borderless
                  emit-value
                  map-options
                  option-value="id"
                  option-label="nome"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-edit="props">
              <q-td :props="props" auto-width>
                <q-btn
                  flat
                  dense
                  color="negative"
                  icon="delete"
                  @click="removePessoa(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Guardar"
            @click="guardaFormulario"
            v-if="pessoas.length > 0"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import useApi from "src/composables/UseApi";

export default defineComponent({
  name: "mainPage",
  setup() {
    const inputClubs = ref(null);

    const clubes = ref([]);
    const clube = ref(null);

    const cargos = ref([]);

    const pessoas = ref([]);

    const { listarClubes, listarCargos } = useApi();

    watch(clube, (_current, _previus) => {
      pessoas.value.forEach((pessoa) => {
        pessoa.clube_id = clube.value.id;
      });
    });

    const initData = async () => {
      try {
        clubes.value = await listarClubes();
        cargos.value = await listarCargos();
      } catch (error) {
        console.log(error);
      }
    };

    const adicionaPessoa = () => {
      if (inputClubs.value.validate() === false) return;

      pessoas.value.push({
        nome_pessoa: "",
        cargo_id: null,
        clube_id: clube.value.id,
      });
    };

    const removePessoa = (pessoa) => {
      pessoas.value = pessoas.value.filter((p) => p.nome !== pessoa.nome);
    };

    const guardaFormulario = () => {};

    onMounted(() => {
      initData();
    });

    return {
      inputClubs,
      clubes,
      cargos,
      pessoas,
      clube,
      columns: [
        {
          name: "nome",
          label: "Nome",
          field: "nome",
          align: "left",
          sortable: true,
        },
        {
          name: "cargo_id",
          label: "Cargo",
          field: "cargo_id",
          align: "left",
          sortable: true,
        },
        { name: "edit", label: "", field: "edit", sortable: false },
      ],
      adicionaPessoa,
      removePessoa,
      guardaFormulario,
    };
  },
});
</script>
