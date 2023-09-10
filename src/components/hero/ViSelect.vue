<template>
  <el-select
    v-model="value"
    filterable
    multiple
  >
    <el-option
      v-for="item of heroes"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from "vue"
import { ElSelect, ElOption } from "element-plus"
import { vindictusHeroes, Hero } from "./heroes.ts"
import { HeroStorage } from "../../storage/hero.ts"

const heroes: string[] = []

const props = defineProps({
  modelValue: {
    type: [String, Array<string>],
    default: undefined,
  },
})
const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[] | undefined): void
  (e: "save", value: string | string[] | undefined): void
}>()

const value = computed({
  get(): string | string[] | undefined {
    return props.modelValue
  },
  set(value: string | string[] | undefined) {
    emit("update:modelValue", value)
    emit("save", value)
  },
})

onBeforeMount(() => {
  vindictusHeroes.forEach((hero: Hero) => {
    heroes.push(hero.name)
  })
  for (const hero of HeroStorage.customized.values()) {
    heroes.push(hero.name)
  }
})
</script>
