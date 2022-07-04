<script setup lang="ts">
import { useGlobalStore } from '@/store/global'
const globalStore = useGlobalStore()
const isViewFlag = computed(() => globalStore.isViewFlag)
</script>

<template>
  <div v-if="isViewFlag" class="main">
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: calc(100% - 40px);
}
</style>
