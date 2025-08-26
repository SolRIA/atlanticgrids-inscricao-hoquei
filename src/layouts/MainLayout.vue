<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          INSCRIÇÃO NA SESSÃO DE ESCLARECIMENTO NOVAS REGRAS 2025/2026
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
@media (max-width: 750px) {
  .q-toolbar__title {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .q-toolbar__title {
    font-size: 12px;
  }
}

@media (max-width: 440px) {
  .q-toolbar__title {
    font-size: 10px;
  }
}
</style>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "MainLayout",
})
</script>
