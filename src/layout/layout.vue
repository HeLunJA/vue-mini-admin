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
// bodyColor main视图底部颜色
const bodyColor = computed(() => (isDark.value ? '#f5f5f500' : '#f5f5f5'))
const expandColor = computed(() => (isDark.value ? '#fff' : '#606266'))
const rotate = computed(() => (isCollapse.value ? 'rotate(0deg)' : 'rotate(180deg)'))
const collapseWidth = computed(() => (isCollapse.value ? '64px' : '200px'))
const topBorderColor = computed(() => (isDark.value ? '#4c4d4f ' : '#dcdfe6'))
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
    <el-container class="body-height">
      <el-aside class="aside" :width="collapseWidth">
        <el-scrollbar>
          <div class="menu-top-box">
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
.layout {
  .header {
    border-bottom: 1px solid v-bind(topBorderColor);
    box-sizing: border-box;
  }
  .body-height {
    height: calc(100vh - 60px);
  }
  .aside {
    height: 100%;
    .menu-top-box {
      .margin-left-8px {
        margin-right: 8px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0px 8px;
      border-right: 1px solid v-bind(topBorderColor);
      box-sizing: border-box;
      width: v-bind(collapseWidth);
      .expand {
        width: 18px;
        height: 18px;
        transform: v-bind(rotate);
        color: v-bind(expandColor);
      }
    }
  }
  :deep(.el-main) {
    background: v-bind(bodyColor);
  }
  :deep(.el-aside) {
    transition: all 0.2s ease;
  }
}
</style>
