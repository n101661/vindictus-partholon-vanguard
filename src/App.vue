<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        router
        default-active="calculate-best-teams"
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
import { ref } from "vue"
import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElButton,
} from "element-plus"
import {
  Fold,
  Expand,
  Search,
  UserFilled,
  Document,
} from "@element-plus/icons-vue"
import { RouterView } from "vue-router"

const menuCollapse = ref(false)
</script>
