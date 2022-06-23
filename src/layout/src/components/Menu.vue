<script setup lang="ts">
import { themeStore } from '@/store/theme'
import MenuItem from '@/layout/src/components/MenuItem.vue'
import { useGlobalStore } from '@/store/global'
const store = themeStore()
const globalStore = useGlobalStore()
const isCollapse = computed(() => store.isCollapse)
const router = useRouter()
const route = useRoute()
const action = (name: string) => {
  router.push({
    name
  })
}
const routerList = computed(() => globalStore.routerList)
</script>

<template>
  <el-menu :default-active="route.name" :collapse="isCollapse" :collapse-transition="false" class="menu">
    <el-menu-item index="home" @click="action('home')">
      <el-icon><component is="Eleme"></component></el-icon>
      <template #title>首页概况</template>
    </el-menu-item>
    <MenuItem :menuList="routerList" />
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
