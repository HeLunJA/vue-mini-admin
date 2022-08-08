<script setup lang="ts">
import { useSwitchDark, useDarkThemeChange } from '@/hooks/useChangeTheme'
const isDark = useSwitchDark()
const iconName = computed(() => (isDark.value ? 'moon' : 'sunny'))
</script>

<template>
  <component :is="iconName" class="setIcon" @click="useDarkThemeChange(!isDark)"></component>
</template>

<style lang="scss" scoped>
.setIcon {
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin-left: 12px;
}
</style>
