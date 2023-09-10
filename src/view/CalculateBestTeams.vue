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
import { HeroStorage } from "../storage/hero"

const heroes = ref<number[]>(getHeroes())
const missionCount = ref(1)

function getHeroes(): number[] {
  const heroes: number[] = []
  HeroStorage.ownedHeroes.forEach((hero) => {
    for (let i = 0; i < hero.amount; i++) {
      heroes.push(hero.heroID)
    }
  })
  return heroes
}
</script>
