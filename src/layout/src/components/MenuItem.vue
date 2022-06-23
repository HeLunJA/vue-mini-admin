<template>
  <template v-for="(item, index) in props.menuList">
    <el-sub-menu :index="item.name" v-if="item.children" :key="item.name">
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.label }}</span>
      </template>
      <MenuItem :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.name" @click="action(item.name)" :key="(item.name as RouteRecordName)">
      <el-icon><component :is="item.meta.icon"></component></el-icon>
      <template #title>{{ item.meta.label }}</template>
    </el-menu-item>
  </template>
</template>
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
<style scoped></style>
