<template>
  <el-container>
    <el-aside>
      <el-menu
        router
        default-active="calculate-best-teams"
      >
        <el-menu-item index="calculate-best-teams">
          <el-icon><Search /></el-icon>
          <template #title>Calculate Best Teams</template>
        </el-menu-item>
        <el-menu-item index="owned-heroes">
          <el-icon><UserFilled /></el-icon>
          <template #title>Owned Heroes</template>
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
import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElIcon,
} from "element-plus"
import { Search, UserFilled, Document } from "@element-plus/icons-vue"
import { RouterView } from "vue-router"
</script>
