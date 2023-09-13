<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        router
        :default-active="activeRouteName"
        :collapse="menuCollapse"
      >
        <el-button
          style="width: 30px; height: 30px"
          @click="menuCollapse = !menuCollapse"
        >
          <el-icon size="25px">
            <Fold v-if="menuCollapse" />
            <Expand v-else />
          </el-icon>
        </el-button>
        <el-menu-item index="calculate-best-teams">
          <el-icon><Search /></el-icon>
          <template #title>Calculate Best Teams</template>
        </el-menu-item>
        <el-menu-item index="heroes">
          <el-icon><Document /></el-icon>
          <template #title>Heroes</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElButton,
} from "element-plus"
import { Fold, Expand, Search, Document } from "@element-plus/icons-vue"
import { RouterView, useRoute } from "vue-router"

const menuCollapse = ref(false)
const activeRouteName = computed(
  (): string => useRoute().name?.toString() ?? "calculate-best-teams",
)
</script>
