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
          v-if="(row as HeroTableRow).hero.id > officialHeroMaxId"
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
      <template #default="{ row }">
        <el-image
          v-if="(row as HeroTableRow).hero.id <= officialHeroMaxId"
          style="width: 40px; height: 40px"
          :src="heroImageURL((row as HeroTableRow).hero.id)"
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
      prop="hero.name"
      label="Name"
      width="100px"
    >
      <template #default="{ row }">
        {{ (row as HeroTableRow).hero.name }}
      </template>
    </el-table-column>
    <el-table-column
      prop="hero.specialties"
      label="Specialties"
    >
      <template #default="{ row }">
        <el-tag
          v-for="(sp, i) in (row as HeroTableRow).hero.specialties"
          v-show="sp"
          :key="i"
        >
          {{ sp }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="amount"
      label="Amount"
    >
      <template #default="{ row }">
        <el-input
          v-model.number="(row as HeroTableRow).amount"
          type="number"
          min="0"
          @input="
            (value) => {
              const r: HeroTableRow = row

              const v = Number(value)
              ViStorage.hero.setOwnedHero(r.hero.id, v)

              r.amount = v
            }
          "
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import {
  ElButton,
  ElInput,
  ElTable,
  ElTableColumn,
  ElImage,
  ElIcon,
  ElTag,
  ElMessage,
  ElMessageBox,
} from "element-plus"
import { Plus, Minus, Avatar } from "@element-plus/icons-vue"
import { Hero } from "../models/hero"
import { vindictusHeroes } from "../components/hero/heroes.ts"
import HeroDialog from "../components/hero/HeroDialog.vue"
import ViStorage from "../storage"

const heroes = ref<HeroTableRow[]>(
  Array.from(vindictusHeroes.entries(), (v): HeroTableRow => {
    return {
      hero: v[1].clone(),
      amount: 0,
    }
  }).concat(
    ...Array.from(
      ViStorage.hero.customizedHeroes.values(),
      (v): HeroTableRow => {
        return {
          hero: v.clone(),
          amount: 0,
        }
      },
    ),
  ),
)
const officialHeroMaxId = vindictusHeroes.size

const customizedHeroId = ref(ViStorage.hero.customizedHeroId)
const dialogVisible = ref(false)

onBeforeMount(() => {
  const ownedHeroes = ViStorage.hero.ownedHeroes
  for (let hero of heroes.value) {
    const id = hero.hero.id
    hero.amount = ownedHeroes.get(id) ?? 0
  }
})

function addHero(v: Hero) {
  const hero = v.clone()

  ViStorage.hero.addCustomizedHero(hero)
  heroes.value.push({
    hero: hero,
    amount: 0,
  })

  ElMessage({
    message: `Created ${v.name} successful`,
    type: "success",
  })
}

async function removeHero(hero: HeroTableRow, index: number) {
  const confirm = await ElMessageBox.confirm(
    `Do you want to remove '${hero.hero.name}'?`,
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
      ViStorage.hero.removeCustomizedHero(removedHeroes[0].hero.id)
      ViStorage.hero.setOwnedHero(removedHeroes[0].hero.id, 0)
    }

    ElMessage({
      message: "Remove completed",
      type: "success",
    })
  }
}

function saveCustomizedHeroId(id: number) {
  ViStorage.hero.customizedHeroId = id
}

function heroImageURL(i: number): string {
  return (
    "https://twskyimg.akamaized.net/gameweb/mh/home/img/heros/" + i + "@2x.png"
  )
}
</script>

<script lang="ts">
interface HeroTableRow {
  hero: Hero
  amount: number
}
</script>
