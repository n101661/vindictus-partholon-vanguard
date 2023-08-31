<template>
  <el-select
    v-model="value"
    filterable
    multiple
  >
    <el-option
      v-for="item of heroes"
      :key="item"
      :label="getHeroName(item)"
      :value="item"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from "vue"
import { ElSelect, ElOption } from "element-plus"
import { vindictusHeroes, Hero, getName as getHeroName } from "./heroes.ts"

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
  for (const hero of vindictusHeroes.keys()) {
    heroes.push(hero)
  }
  if (!window.localStorage) return
  const extraHeroes: Hero[] = JSON.parse(
    window.localStorage.getItem("extra-heroes") ?? "[]",
  )
  for (const hero of extraHeroes) {
    heroes.push(hero.name)
  }
})
</script>
