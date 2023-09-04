<template>
  <h2>Owned Heroes</h2>
  <vi-select-heroes
    v-model="heroes"
    @save="saveHeroes"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ViSelectHeroes from "../components/hero/ViSelect.vue"

const heroes = ref<string[]>(getHeroes())

function saveHeroes(value: string | string[] | undefined) {
  if (!window.localStorage) {
    return
  }
  window.localStorage.setItem("heroes", JSON.stringify(value))
}

function getHeroes(): string[] {
  if (!window.localStorage) {
    return []
  }
  const data = window.localStorage.getItem("heroes")
  if (data == null) {
    return []
  }
  return JSON.parse(data)
}
</script>
