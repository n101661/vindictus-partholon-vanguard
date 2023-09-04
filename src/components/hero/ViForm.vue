<template>
  <el-form
    ref="formRef"
    :model="heroForm"
    label-width="auto"
    :rules="{
      name: [
        {
          type: 'string',
          required: true,
          message: 'Please input hero name',
          trigger: 'blur',
        },
      ],
      specialties: [
        {
          type: 'array',
          required: true,
          len: 5,
          message: 'Please choose 5 specialties',
          trigger: 'change',
        },
      ],
    }"
    status-icon
  >
    <el-form-item
      prop="name"
      label="Hero Name"
    >
      <el-input v-model="heroForm.name" />
    </el-form-item>
    <el-form-item
      prop="specialties"
      label="Specialties"
    >
      <el-select
        v-model="heroForm.specialties"
        placeholder="Input for filter or add item"
        multiple
        :multiple-limit="5"
        clearable
        filterable
        allow-create
      >
        <el-option
          v-for="specialty in heroSpecialties"
          :key="specialty"
          :label="specialty"
          :value="specialty"
        />
      </el-select>
    </el-form-item>
    <el-button
      type="primary"
      @click="addHero(formRef)"
    >
      Submit
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from "vue"
import type { FormInstance } from "element-plus"
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
} from "element-plus"
import { vindictusHeroes, Hero } from "./heroes.ts"

const heroSpecialties = new Set<string>()

const formRef = ref<FormInstance>()
const heroForm = reactive<Hero>({
  name: "",
  specialties: [],
})

onBeforeMount(() => {
  vindictusHeroes.forEach((values: string[]) => {
    values.forEach((v: string) => {
      if (v !== "") heroSpecialties.add(v)
    })
  })
})

async function addHero(form: FormInstance | undefined) {
  if (form == undefined) return
  await form.validate((valid: boolean) => {
    if (!valid) return

    if (!window.localStorage) return
    const extraHeroes: Hero[] = JSON.parse(
      window.localStorage.getItem("extra-heroes") ?? "[]",
    )
    extraHeroes.push({ name: heroForm.name, specialties: heroForm.specialties })
    window.localStorage.setItem("extra-heroes", JSON.stringify(extraHeroes))

    form.resetFields()
  })
}
</script>
