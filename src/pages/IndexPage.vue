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

    <div class="row justify-center">
      <q-card class="formulario">
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

            <template #body="props">
              <q-tr :props="props">
                <!-- nome pessoa -->
                <q-td key="nome_pessoa" :props="props">
                  <q-input
                    v-model="props.row.nome_pessoa"
                    borderless
                    @update:model-value="validaPessoas"
                  />
                </q-td>

                <!-- cargo -->
                <q-td key="cargo_id" :props="props">
                  <q-select
                    v-model="props.row.cargo_id"
                    :options="cargos"
                    borderless
                    emit-value
                    map-options
                    option-value="id"
                    option-label="nome"
                    @update:model-value="validaPessoas"
                  />
                </q-td>

                <!-- accoes -->
                <q-td key="accoes" :props="props" style="width: 30px">
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="delete"
                    @click="removePessoa(props.row)"
                  />
                </q-td>
              </q-tr>

              <!-- erros -->
              <q-tr
                :props="props"
                v-if="!isNullOrWhiteSpace(props.row.erro)"
                class="bg-negative"
              >
                <q-td colspan="100%">
                  <div class="text-left text-white text-body1 q-mx-lg">
                    {{ props.row.erro }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Guardar"
            :loading="saving"
            @click="guardaFormulario"
            v-if="pessoas.length > 0"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="showSavedConfirmation">
      <q-card class="q-pa-xl">
        <q-card-section class="text-center">
          <q-icon name="task_alt" color="positive" size="8em" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Os dados foram guardados com sucesso</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup color="primary" label="Fechar" size="lg" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
.formulario {
  width: 650px;
  margin: 50px;
  padding: 40px;
}
@media (max-width: 650px) {
  .formulario {
    margin: 0;
    padding: 5px;
    width: 100%;
  }
}
</style>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import useApi from "src/composables/UseApi";

export default defineComponent({
  name: "mainPage",
  setup() {
    const $q = useQuasar();

    const inputClubs = ref(null);
    const saving = ref(false);
    const showSavedConfirmation = ref(false);

    const clubes = ref([]);
    const clube = ref(null);

    const cargos = ref([]);

    const pessoas = ref([]);

    const { listarClubes, listarCargos, guardarPessoas } = useApi();

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
        erro: null,
      });
    };

    const removePessoa = (pessoa) => {
      pessoas.value = pessoas.value.filter(
        (p) => p.nome_pessoa !== pessoa.nome_pessoa
      );
    };

    const isNullOrWhiteSpace = (stringToCheck) => {
      if (typeof stringToCheck === "undefined") return true;
      if (stringToCheck === null) return true;

      if (
        typeof stringToCheck === "string" &&
        stringToCheck.trim().length === 0
      ) {
        return true;
      }

      return false;
    };
    const validaPessoas = () => {
      pessoas.value.forEach((pessoa) => {
        // reset dos erros
        pessoa.erro = null;

        // valida o cargo da pessoa
        if (pessoa.cargo_id === null) {
          pessoa.erro = "O cargo não está definido";
        }

        // valida o nome da pessoa
        if (isNullOrWhiteSpace(pessoa.nome_pessoa)) {
          pessoa.erro = "O nome está vazio";
        }
      });

      const registosInvalidos = pessoas.value.find(
        (p) => p.erro !== null && p.erro.length > 0
      );

      return registosInvalidos === undefined;
    };

    const guardaFormulario = () => {
      // validar os registos
      const valid = validaPessoas();

      if (valid === false) {
        // existem registos não válidos, vamos alertar o utilizador
        $q.dialog({
          title: "Atenção",
          message:
            "Existem registos que não são válidos. Reveja os valores introduzidos e corriga os erros.",
        });
        return;
      }

      // os registos são válidos, vamos perguntar se quer mesmo avançar com a submição
      $q.dialog({
        title: "Confirmar",
        message: "Quer submeter todos os registos?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const pessoasGuardar = pessoas.value
          .filter((p) => p.erro === null)
          .map((p) => ({
            nome_pessoa: p.nome_pessoa,
            cargo_id: p.cargo_id,
            clube_id: p.clube_id,
          }));

        try {
          saving.value = true;
          // guardar o formulário
          await guardarPessoas(pessoasGuardar);

          // limpar o formulário
          pessoas.value = [];
          // mostrar ao utilizador que a operação foi bem sucedida
          showSavedConfirmation.value = true;
        } catch (error) {
          $q.dialog({
            title: "Erro",
            message: "Não foi possível guardar o formulário",
          });
        }
        saving.value = false;
      });
    };

    onMounted(() => {
      initData();
    });

    return {
      inputClubs,
      saving,
      showSavedConfirmation,
      clubes,
      cargos,
      pessoas,
      clube,
      columns: [
        {
          name: "nome_pessoa",
          label: "Nome",
          field: "nome_pessoa",
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
        { name: "accoes", label: "", field: "accoes", sortable: false },
      ],
      isNullOrWhiteSpace,
      validaPessoas,
      adicionaPessoa,
      removePessoa,
      guardaFormulario,
    };
  },
});
</script>
