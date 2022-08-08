<script setup lang="ts">
import screenfull from 'screenfull'
import LayoutBreadcrumb from './LayoutBreadcrumb.vue'
import { useGlobalStore } from '@/store/global'
import { themeStore } from '@/store/theme'

const gloablStore = useGlobalStore()
const theme_store = themeStore()
const router = useRouter()
const isCollapse = computed(() => theme_store.isCollapse)
const collapseWidth = computed(() => (isCollapse.value ? '64px' : '200px'))
const isOpen = ref(true)
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
const toggleFullscreen = () => {
  isOpen.value = !isOpen.value
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
  console.log('[ isOpen.value ] >', isOpen.value)
}
</script>

<template>
  <div class="headerBox">
    <div class="headerBox-left">
      <img class="logo" src="@/assets/img/logo.png" alt="" />
      <transition name="el-fade-in-linear">
        <h4 v-show="!isCollapse" class="title">admin</h4>
      </transition>
    </div>
    <div class="headerBox-center">
      <LayoutBreadcrumb />
    </div>
    <div class="headerBox-right">
      <dark-theme-switch />
      <span
        :class="['iconfont', isOpen ? 'icon-quanping_o' : 'icon-quxiaoquanping_o', 'icon-size']"
        @click="toggleFullscreen"
      ></span>
      <span
        :class="['iconfont', isOpen ? 'icon-a-yuyanzhongwen' : 'icon-a-yuyanyingwen', 'lang-size']"
        @click="toggleFullscreen"
      ></span>
      <el-dropdown trigger="click">
        <component :is="'setting'" class="setIcon"></component>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="SwitchButton" @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-size {
  font-size: 24px;
  margin-left: 12px;
  color: var(--el-text-color-regular);
}
.lang-size {
  font-size: 24px;
  margin-left: 12px;
  color: var(--el-text-color-regular);
}
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
