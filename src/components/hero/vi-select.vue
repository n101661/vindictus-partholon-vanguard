<template>
  <el-select
    v-model="value"
    filterable
    multiple
  >
    <el-option
      v-for="item in heroes"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { ElSelect, ElOption } from "element-plus"
import { vindictusHeroes } from "./heroes.ts"

const heroes = vindictusHeroes.keys()

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
</script>
