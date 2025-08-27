<template>
  <q-page padding class="flex flex-center">
    <q-card class="q-pa-xl q-ma-xl">
      <q-card-section class="text-center">
        <img alt="APA" src="~assets/APA.webp" class="col-12" style="width: 200px" />
        <img alt="APACA" src="~assets/APA_APACA.jpg" class="col-12" style="width: 200px" />
      </q-card-section>
      <q-card-section class="text-center">
        <q-icon name="task_alt" color="positive" size="8em" />
      </q-card-section>
      <q-card-section>
        <div class="text-h5 text-center">Agradecemos a sua inscrição.</div>
        <div class="text-subtitle1 q-mt-xl">
          A presença do clube {{ clube }} foi registada para {{ data }} com os seguintes participantes:
        </div>
        <div class="text-body1">
          <ul>
            <li v-for="inscrito in inscritos" :key="inscrito.id">
              {{ inscrito.nome_pessoa }}: <span class="text-caption">({{ inscrito.cargos.nome }})</span>
            </li>
          </ul>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue"

onMounted(() => {
  inscritos.value = JSON.parse(localStorage.getItem('data'))
  data.value = inscritos.value[0].data
  clube.value = inscritos.value[0].clubes.nome
})

const inscritos = ref([])
const clube = ref(null)
const data = ref(null)

</script>
