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
  <el-form-item label="Mission Amount">
    <el-select v-model="missionCount">
      <el-option
        v-for="i in 5"
        :key="i"
        :label="i"
        :value="i"
      />
    </el-select>
  </el-form-item>
  <vi-mission-form :count="missionCount" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElDivider, ElFormItem, ElSelect, ElOption } from "element-plus"
import ViFormHeroes from "./components/hero/ViForm.vue"
import ViSelectHeroes from "./components/hero/ViSelect.vue"
import ViMissionForm from "./components/ViMissionForm.vue"

const hero = ref<string[]>(getHeroes())
const missionCount = ref(1)

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
