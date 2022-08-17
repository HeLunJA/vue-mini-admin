<script lang="ts" setup>
import type { ItabItem } from '@/store/global/type'
import type { RouteRecordName } from 'vue-router'
import { storeToRefs } from 'pinia'
import useChangeDarkTheme from '@/hooks/useChangeDarkTheme'
import { useGlobalStore } from '@/store/global'
const router = useRouter()
const route = useRoute()
const gloablStore = useGlobalStore()
const { tabList } = storeToRefs(gloablStore)
const { isDark } = useChangeDarkTheme()
const activeColor = computed(() => (isDark.value ? '#274f62' : '#cae4ff'))
const tabAction = (name: RouteRecordName) => {
  router.push({
    name
  })
}
const tabClose = (name: RouteRecordName) => {
  gloablStore.removeTab(name, route.name!)
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
      gloablStore.addTab({ name: route.name, label: route.meta.label as string, path: route.path })
    }
  }
)
</script>

<template>
  <el-scrollbar class="tab">
    <el-tag
      v-for="item in tabList"
      :key="item.name"
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
  border-bottom: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color-overlay);
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
