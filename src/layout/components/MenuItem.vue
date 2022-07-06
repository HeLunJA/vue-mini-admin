<script lang="ts" setup>
import type { RouteRecordName } from 'vue-router'
type Props = {
  menuList: TRouterItem[]
}
const router = useRouter()
const props = defineProps<Props>()
const action = (name: RouteRecordName | undefined) => {
  router.push({ name })
}
</script>
<template>
  <template v-for="item in props.menuList">
    <el-sub-menu v-if="item.children" :key="item.name" :index="(item.name as string)">
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.label }}</span>
      </template>
      <MenuItem :menu-list="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :key="item.name!" :index="(item.name as string)" @click="action(item.name)">
      <el-icon><component :is="item.meta.icon"></component></el-icon>
      <template #title>{{ item.meta.label }}</template>
    </el-menu-item>
  </template>
</template>
