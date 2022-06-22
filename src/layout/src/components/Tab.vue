<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
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
const activeColor = computed(() => (isDark.value ? '#274f62' : '#cae4ff'))
const tabAction = (name: string) => {
  router.push({
    name
  })
}
const tabClose = (name: string) => {
  gloablStore.removeTab(name, route.name as string)
}
const refresh = () => {
  gloablStore.updateViewFlag(false)
  nextTick(() => {
    gloablStore.updateViewFlag(true)
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
    if (route.name && route.name !== 'notFound' && route.name !== 'login') {
      gloablStore.addTab({ name: route.name as string, label: route.meta.label as string, path: route.path })
    }
  }
)
</script>

<template>
  <el-scrollbar class="tab">
    <el-tag
      v-for="item in tabList"
      closable
      :class="{ 'tab-item': true, 'tab-active': route.name === item.name }"
      @click="tabAction(item.name)"
      @close="tabClose(item.name)"
      :key="item.name"
    >
      <el-dropdown trigger="contextmenu">
        <span>
          {{ item.label }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="refresh">刷新页面</el-dropdown-item>
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
  border-bottom: 1px solid $theme-border-color;
  background-color: $theme--card-bgc-color;
  &-item {
    margin-right: 8px;
    height: 30px;
    cursor: pointer;
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
