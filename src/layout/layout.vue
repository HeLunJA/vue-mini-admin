<script setup lang="ts">
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Tab from './components/Tab.vue'
import { useSwitchDark } from '@/hooks/useChangeTheme'
import { computed, onMounted } from 'vue'
import MenuSearch from '@/components/MenuSearch/index.vue'
import { themeStore } from '@/store/theme'
const store = themeStore()
const isCollapse = computed(() => store.isCollapse)
const isDark = useSwitchDark()
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
    <el-header class="header"><Header /></el-header>
    <el-container class="container">
      <el-aside class="aside" :width="collapseWidth">
        <el-scrollbar>
          <div class="search">
            <MenuSearch class="margin-left-8px" v-if="!isCollapse" />
            <component class="expand" is="Expand" @click="changeMenu"></component>
          </div>
          <Menu />
        </el-scrollbar>
      </el-aside>
      <el-main>
        <Tab />
        <Main />
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
  :deep(.el-main) {
    background: $base-bgc-color;
  }
  :deep(.el-aside) {
    transition: all 0.2s ease;
  }
}
</style>
