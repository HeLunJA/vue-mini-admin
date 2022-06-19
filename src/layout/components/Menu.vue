<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { routerItem } from '@/types'
import { computed, ref } from 'vue'
import { themeStore } from '@/store/theme'
import { getRouterList } from '@/service/login'
import MenuItem from '@/layout/components/MenuItem.vue'
import setRouter from '@/utils/setRouter'
import type { RouteRecordRaw } from 'vue-router'

const store = themeStore()
const isCollapse = computed(() => store.isCollapse)
const router = useRouter()
const route = useRoute()
const action = (name: string) => {
  router.push({
    name
  })
}
const routerList = ref<routerItem[]>([])
getRouterList().then((res) => {
  routerList.value = setRouter(res.data.list)
  routerList.value.forEach((item) => {
    console.log(item)

    router.addRoute(item as unknown as RouteRecordRaw)
  })
})
</script>

<template>
  <el-menu :default-active="route.name" :collapse="isCollapse" :collapse-transition="false" class="menu">
    <el-menu-item index="home" @click="action('home')">
      <el-icon><component is="Setting"></component></el-icon>
      <template #title>首页</template>
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
