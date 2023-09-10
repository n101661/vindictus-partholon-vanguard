<template>
  <h2>Heroes</h2>
  <hero-dialog
    v-model="dialogVisible"
    title="Create Hero"
    :init-customized-hero-id="customizedHeroId"
    @submit="addHero"
    @update:customized-hero-id="saveCustomizedHeroId"
  />

  <el-table :data="heroes">
    <el-table-column width="70px">
      <template #header>
        <el-button @click="dialogVisible = true">
          <el-icon><Plus /></el-icon>
        </el-button>
      </template>
      <template #default="{ row, $index }">
        <el-button
          v-if="$index > officialHeroIndex"
          type="danger"
          plain
          @click="removeHero(row, $index)"
        >
          <el-icon><Minus /></el-icon>
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
        {{ (row as Hero).name }}
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
  ElMessageBox,
} from "element-plus"
import { Plus, Minus, Avatar } from "@element-plus/icons-vue"
import { Hero, vindictusHeroes } from "../components/hero/heroes.ts"
import HeroDialog from "../components/hero/HeroDialog.vue"
import { HeroStorage } from "../storage/hero.ts"

const heroes = ref<Hero[]>(
  Array.from(vindictusHeroes.entries(), (v): Hero => {
    return new Hero(v[1].id, v[1].name, [...v[1].specialties])
  }),
)
const officialHeroIndex = vindictusHeroes.size - 1

const customizedHeroId = ref(HeroStorage.customizedHeroId)
const dialogVisible = ref(false)

onBeforeMount(() => {
  for (const hero of HeroStorage.customizedHeroes.values()) {
    heroes.value.push(hero)
  }
})

function addHero(v: Hero) {
  const hero: Hero = {
    id: v.id,
    name: v.name,
    specialties: [...v.specialties],
  }

  HeroStorage.addCustomizedHero(hero)
  heroes.value.push(hero)

  ElMessage({
    message: `Created ${v.name} successful`,
    type: "success",
  })
}

async function removeHero(hero: Hero, index: number) {
  const confirm = await ElMessageBox.confirm(
    `Do you want to remove '${hero.name}'?`,
    "Warning",
    {
      confirmButtonText: "OK",
      type: "warning",
    },
  )
    .then((): boolean => true)
    .catch((): boolean => false)

  if (confirm) {
    const removedHeroes = heroes.value.splice(index, 1)
    if (removedHeroes.length == 1) {
      HeroStorage.removeCustomizedHero(removedHeroes[0].id)
    }

    ElMessage({
      message: "Remove completed",
      type: "success",
    })
  }
}

function saveCustomizedHeroId(id: number) {
  HeroStorage.customizedHeroId = id
}

function heroImageURL(i: number): string {
  return (
    "https://twskyimg.akamaized.net/gameweb/mh/home/img/heros/" + i + "@2x.png"
  )
}
</script>
