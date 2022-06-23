<script setup lang="ts">
import DarkThemeSwitch from '@/components/DarkThemeSwitch'
import Breadcrumb from './Breadcrumb'
import { useGlobalStore } from '@/store/global'
import { themeStore } from '@/store/theme'
const gloablStore = useGlobalStore()
const theme_store = themeStore()
const router = useRouter()
const isCollapse = computed(() => theme_store.isCollapse)
const collapseWidth = computed(() => (isCollapse.value ? '64px' : '200px'))
const loginOut = () => {
  router
    .replace({
      name: 'login'
    })
    .then(() => {
      gloablStore.updateTabList([{ name: 'home', path: '/home', label: '首页概况' }])
      gloablStore.updateToken('')
    })
}
</script>

<template>
  <div class="headerBox">
    <div class="headerBox-left">
      <img class="logo" src="@/assets/img/logo.png" alt="" />
      <transition name="el-fade-in-linear">
        <h4 class="title" v-show="!isCollapse">admin</h4>
      </transition>
    </div>
    <div class="headerBox-center">
      <Breadcrumb />
    </div>
    <div class="headerBox-right">
      <DarkThemeSwitch></DarkThemeSwitch>
      <el-dropdown trigger="click">
        <component class="setIcon" is="Tools"></component>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut" icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headerBox {
  display: flex;
  justify-content: space-between;
  height: 100%;
  &-left {
    width: v-bind(collapseWidth);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    .logo {
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }
  }
  &-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &-right {
    display: flex;
    align-items: center;
    .setIcon {
      width: 18px;
      height: 18px;
      margin-left: 12px;
    }
  }
}
</style>
