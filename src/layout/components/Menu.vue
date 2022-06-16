<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { themeStore } from '@/store/theme'
const store = themeStore()
const isCollapse = computed(() => store.isCollapse)
const router = useRouter()
const route = useRoute()
const action = (name: string) => {
  router.push({
    name
  })
}
</script>

<template>
  <el-menu :default-active="route.name" :collapse="isCollapse" :collapse-transition="false" class="menu">
    <el-menu-item index="home" @click="action('home')">
      <el-icon><component is="Setting"></component></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-sub-menu index="cs1">
      <template #title>
        <el-icon><component is="Setting"></component></el-icon>
        <span>测试目录1</span>
      </template>
      <el-menu-item index="set1" @click="action('set1')">
        <template #title>
          <el-icon><component is="Setting"></component></el-icon>
          <span>设置1</span>
        </template>
      </el-menu-item>
      <el-menu-item index="set11" @click="action('set11')">
        <template #title>
          <el-icon><component is="Setting"></component></el-icon>
          <span>设置111</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="cs2">
      <template #title>
        <el-icon><component is="Setting"></component></el-icon>
        <span>测试目录2</span>
      </template>
      <el-menu-item index="set2" @click="action('set2')">
        <template #title>
          <el-icon><component is="Setting"></component></el-icon>
          <span>设置234</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss" scoped>
.menu {
  height: calc(100vh - 100px);
  .icon {
    width: 16px;
    height: 16px;
    margin-right: 16px;
  }
}
</style>
