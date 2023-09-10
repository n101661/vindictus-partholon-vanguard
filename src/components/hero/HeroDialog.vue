<template>
  <el-dialog
    v-model="visible"
    :title="title"
  >
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
        @click="submitHandler(formRef)"
      >
        Submit
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onBeforeMount } from "vue"
import type { FormInstance } from "element-plus"
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
} from "element-plus"
import { vindictusHeroes, Hero } from "./heroes.ts"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  initCustomizedHeroId: {
    type: Number,
    default: 1000,
  },
})
const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "submit", value: Hero): void
  (event: "update:customizedHeroId", value: number): void
}>()

const formRef = ref<FormInstance>()
const heroForm = reactive<Hero>({
  id: 0,
  name: "",
  specialties: [],
})
const visible = computed({
  get(): boolean {
    return props.modelValue
  },
  set(v: boolean) {
    emit("update:modelValue", v)
  },
})

const heroSpecialties = new Set<string>()
let customHeroStartId = props.initCustomizedHeroId

onBeforeMount(() => {
  vindictusHeroes.forEach((hero: Hero) => {
    hero.specialties.forEach((v: string) => {
      if (v !== "") heroSpecialties.add(v)
    })
  })
})

function submitHandler(form: FormInstance | undefined) {
  if (form == undefined) return
  form.validate((valid: boolean) => {
    if (!valid) return

    heroForm.id = customHeroStartId++
    emit("submit", heroForm)
    emit("update:customizedHeroId", customHeroStartId)

    visible.value = false
    form.resetFields()
  })
}
</script>
