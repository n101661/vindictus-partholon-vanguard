<template>
  <vi-form-heroes />
  <el-divider />
  <h2>The Heroes You Have</h2>
  <vi-select-heroes
    v-model="hero"
    @save="saveHeroes"
  />
  <el-divider />
  <h2>Calculate Best Teams</h2>
  <vi-mission-form />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElDivider } from "element-plus"
import ViFormHeroes from "./components/hero/vi-form.vue"
import ViSelectHeroes from "./components/hero/vi-select.vue"
import ViMissionForm from "./components/vi-mission-form.vue"

const hero = ref<string[]>(getHeroes())

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

<style scoped></style>
