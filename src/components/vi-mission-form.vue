<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="{
      specialties: [
        {
          type: 'array',
          len: 3,
          message: 'Please choose 3 specialties',
          trigger: 'change',
        },
      ],
      heroSlots: [
        {
          type: 'number',
          min: 1,
          max: 3,
          message: 'Valid value is 1 to 3',
          trigger: 'change',
        },
      ],
      grandDiscoveryPoints: [
        {
          type: 'number',
          min: 1,
          message: 'Please input a number greater than 0',
          trigger: 'change',
        },
      ],
    }"
    label-width="auto"
  >
    <el-form-item
      label="Difficulty"
      prop="difficulty"
    >
      <el-select v-model="form.difficulty">
        <el-option
          v-for="opt of difficultyOptions"
          :key="opt.label"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Specialties"
      prop="specialties"
    >
      <el-select
        v-model="form.specialties"
        multiple
        :multiple-limit="3"
      >
        <el-option
          v-for="specialty in specialtiesOptions"
          :key="specialty"
          :label="specialty"
          :value="specialty"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Hero Slots"
      prop="heroSlots"
    >
      <el-input
        v-model.number="form.heroSlots"
        type="number"
        :min="1"
        :max="3"
      />
    </el-form-item>
    <el-form-item
      label="Grand Discovery Points"
      prop="grandDiscoveryPoints"
    >
      <el-input
        v-model.number="form.grandDiscoveryPoints"
        type="number"
        :min="1"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from "vue"
import {
  FormInstance,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElInput,
} from "element-plus"
import { vindictusHeroes } from "./hero/heroes.ts"

const difficultyOptions: DifficultyOption[] = [
  {
    label: "Easy",
    value: 2,
  },
  {
    label: "Normal",
    value: 0,
  },
  {
    label: "Hard",
    value: -2,
  },
]
const specialtiesOptions = new Set<string>()

const formRef = ref<FormInstance>()
const form = reactive<Mission>({
  difficulty: 0,
  specialties: [],
  heroSlots: 1,
  grandDiscoveryPoints: 0,
})

onBeforeMount(() => {
  vindictusHeroes.forEach((values: string[]) => {
    values.forEach((v: string) => {
      if (v != "") specialtiesOptions.add(v)
    })
  })
})
</script>

<script lang="ts">
interface Mission {
  difficulty: -2 | 0 | 2
  specialties: string[]
  heroSlots: 1 | 2 | 3
  grandDiscoveryPoints: number
}

interface DifficultyOption {
  label: string
  value: -2 | 0 | 2
}
</script>
