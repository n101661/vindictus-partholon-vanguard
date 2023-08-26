<template>
  <el-select
    v-model="value"
    filterable
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
import { ElSelect, ElOption } from "element-plus"
import { vindictusHeroes } from "./heroes.ts"
import { ref } from "vue"

const value = ref("")

const heroes = vindictusHeroes.keys()
</script>
