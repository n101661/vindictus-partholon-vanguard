<template>
  <h2>Heroes</h2>
  <hero-dialog
    v-model="dialogVisible"
    title="Create Hero"
    @submit="addHero"
  />

  <el-table :data="heroes">
    <el-table-column width="70px">
      <template #header>
        <el-button @click="dialogVisible = true">
          <el-icon><Plus /></el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="Icon"
      width="80px"
    >
      <template #default="{ $index }">
        <el-image
          v-if="$index <= officialHeroIndex"
          style="width: 40px; height: 40px"
          :src="heroImageURL($index + 1)"
        />
        <el-icon
          v-else
          style="width: 40px; height: 40px"
        >
          <Avatar />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="100px"
    >
      <template #default="{ row }">
        {{ getName((row as Hero).name) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="specialties"
      label="Specialties"
    >
      <template #default="{ row }">
        <el-tag
          v-for="(sp, i) in (row as Hero).specialties"
          v-show="sp"
          :key="i"
        >
          {{ sp }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElImage,
  ElIcon,
  ElTag,
  ElMessage,
} from "element-plus"
import { Plus, Avatar } from "@element-plus/icons-vue"
import { Hero, vindictusHeroes, getName } from "../components/hero/heroes.ts"
import HeroDialog from "../components/hero/HeroDialog.vue"

const heroes = Array.from(
  vindictusHeroes.entries(),
  (v: [string, string[]]): Hero => {
    return new Hero(v[0], [...v[1]])
  },
)
const officialHeroIndex = heroes.length - 1

const dialogVisible = ref(false)

onBeforeMount(() => {
  if (!window.localStorage) return
  const extraHeroes: Hero[] = JSON.parse(
    window.localStorage.getItem("extra-heroes") ?? "[]",
  )
  for (const hero of extraHeroes) {
    heroes.push(hero)
  }
})

function addHero(v: Hero) {
  if (!window.localStorage) return

  const extraHeroes: Hero[] = JSON.parse(
    window.localStorage.getItem("extra-heroes") ?? "[]",
  )
  const hero: Hero = {
    name: v.name,
    specialties: [...v.specialties],
  }
  extraHeroes.push(hero)
  window.localStorage.setItem("extra-heroes", JSON.stringify(extraHeroes))

  heroes.push(hero)

  ElMessage({
    message: `Created ${v.name} successful`,
    type: "success",
  })
}

function heroImageURL(i: number): string {
  return (
    "https://twskyimg.akamaized.net/gameweb/mh/home/img/heros/" + i + "@2x.png"
  )
}
</script>
