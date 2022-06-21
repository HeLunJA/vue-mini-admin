<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSwitchDark } from '@/hooks/useChangeTheme'
import { useGlobalStore } from '@/store/global'
import type { ItabItem } from '@/store/global/type'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const gloablStore = useGlobalStore()
const { tabList } = storeToRefs(gloablStore)
const isDark = useSwitchDark()
const color = computed(() => (isDark.value ? '#409eff' : '#495060'))
const bodyColor = computed(() => (isDark.value ? '#1d1e1f00' : '#fff'))
const borderColor = computed(() => (isDark.value ? '#409eff' : '#d8dce5'))
const activeColor = computed(() => (isDark.value ? '#274f62' : '#cae4ff'))
const navBgcColor = computed(() => (isDark.value ? '#1d1e1f' : '#fff'))
const topBorderColor = computed(() => (isDark.value ? '#4c4d4f ' : '#dcdfe6'))
const tabAction = (name: string) => {
  router.push({
    name
  })
}
const tabClose = (name: string) => {
  gloablStore.removeTab(name, route.name as string)
}
const refresh = (name: string) => {
  router.replace({
    name
  })
}
const pagesClose = (item: ItabItem) => {
  gloablStore.updateTabList([item])
  router.replace({
    name: item.name
  })
}
watch(
  () => route.name,
  () => {
    if (route.name && route.name !== 'notFound') {
      gloablStore.addTab({ name: route.name as string, label: route.meta.label as string, path: route.path })
    }
  }
)
</script>

<template>
  <el-scrollbar class="tab">
    <el-tag
      v-for="item in tabList"
      :color="bodyColor"
      closable
      :class="{ 'tab-item': true, 'tab-active': route.name === item.name }"
      @click="tabAction(item.name)"
      @close="tabClose(item.name)"
    >
      <el-dropdown trigger="contextmenu">
        <span>
          {{ item.label }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="refresh(item.name)">刷新页面</el-dropdown-item>
            <el-dropdown-item @click="tabClose(item.name)">关闭当前页</el-dropdown-item>
            <el-dropdown-item @click="pagesClose(item)">关闭其他页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tag>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.tab {
  box-sizing: border-box;
  padding: 0 20px;
  margin: -20px;
  margin-bottom: 20px;
  height: 40px;
  white-space: nowrap;
  border-bottom: 1px solid v-bind(topBorderColor);
  background-color: v-bind(navBgcColor);
  &-item {
    margin-right: 8px;
    height: 30px;
    cursor: pointer;
    border: 1px solid v-bind(borderColor);
    color: v-bind(color);
  }
  &-active {
    background-color: v-bind(activeColor) !important;
  }
  :deep(.el-card__body) {
    display: flex;
  }
  :deep(.el-scrollbar__wrap) {
    display: flex;
    align-items: center;
  }
}
</style>
