<template>
  <h2>Calculate Best Teams</h2>
  <vi-mission-form :heroes="heroes" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ViMissionForm from "../components/ViMissionForm.vue"
import ViStorage from "../storage"

const heroes = ref<number[]>(getHeroes())

function getHeroes(): number[] {
  const heroes: number[] = []
  ViStorage.hero.ownedHeroes.forEach((amount, heroId) => {
    for (let i = 0; i < amount; i++) {
      heroes.push(heroId)
    }
  })
  return heroes
}
</script>
