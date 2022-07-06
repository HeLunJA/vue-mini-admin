<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutTab from './components/LayoutTab.vue'
import LayoutMain from './components/LayoutMain.vue'
import LayoutMenu from './components/LayoutMenu.vue'

import { themeStore } from '@/store/theme'

const store = themeStore()
const isCollapse = computed(() => store.isCollapse)
const rotate = computed(() => (isCollapse.value ? 'rotate(0deg)' : 'rotate(180deg)'))
const collapseWidth = computed(() => (isCollapse.value ? '64px' : '200px'))
const changeMenu = () => {
  store.updateCollapse()
}
onMounted(() => {
  window.onresize = () => {
    return (() => {
      if (
        (isCollapse.value === false && document.body.clientWidth < 1200) ||
        (isCollapse.value === true && document.body.clientWidth > 1200)
      ) {
        store.updateCollapse()
      }
    })()
  }
})
</script>

<template>
  <el-container class="layout">
    <el-header class="header"><layout-header /></el-header>
    <el-container class="container">
      <el-aside class="aside" :width="collapseWidth">
        <el-scrollbar>
          <div class="search">
            <menu-search v-if="!isCollapse" class="margin-left-8px" />
            <component :is="'Expand'" class="expand" @click="changeMenu"></component>
          </div>
          <layout-menu />
        </el-scrollbar>
      </el-aside>
      <el-main>
        <layout-tab class="tabs" />
        <layout-main class="layoutMain" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.margin-left-8px {
  margin-right: 8px;
}
.layout {
  min-width: 1200px;
  .header {
    border-bottom: 1px solid $theme-border-color;
    box-sizing: border-box;
  }
  .container {
    height: calc(100vh - 60px);
  }
  .aside {
    height: 100%;
    .search {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0px 8px;
      border-right: 1px solid $theme-border-color;
      box-sizing: border-box;
      width: v-bind(collapseWidth);
      .expand {
        width: 18px;
        height: 18px;
        transform: v-bind(rotate);
      }
    }
  }
  .tabs {
    position: sticky;
    top: -20px;
    z-index: 1000;
  }
  .layoutMain {
    margin-top: 20px;
  }
  :deep(.el-main) {
    background: $base-bgc-color;
  }
  :deep(.el-aside) {
    transition: all 0.2s ease;
  }
}
</style>
