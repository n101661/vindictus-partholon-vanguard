<template>
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
  <vi-mission-form
    :count="missionCount"
    :heroes="heroes"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElFormItem, ElSelect, ElOption } from "element-plus"
import ViMissionForm from "../components/ViMissionForm.vue"

const heroes = ref<string[]>(getHeroes())
const missionCount = ref(1)

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
