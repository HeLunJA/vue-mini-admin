<template>
  <template v-for="(item, index) in props.menuList">
    <el-sub-menu :index="item.name" v-if="item.children">
      <template #title>
        <el-icon><component :is="item.icon"></component></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <MenuItem :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.name" @click="action(item.name)">
      <el-icon><component :is="item.icon"></component></el-icon>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import type { routerItem } from '@/types'
type Props = {
  menuList: routerItem[]
}
const router = useRouter()
const props = defineProps<Props>()
const action = (name: string | undefined) => {
  console.log(router.getRoutes())
  router.push({ name })
}
</script>
<style scoped></style>
