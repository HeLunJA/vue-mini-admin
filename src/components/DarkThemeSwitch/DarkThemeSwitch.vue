<script setup lang="ts">
import { useSwitchDark, useDarkThemeChange } from '@/hooks/useChangeTheme'
const isDark = useSwitchDark()
const iconName = computed(() => (isDark.value ? 'moon' : 'sun'))
</script>

<template>
  <svg-icon class="svg" :name="iconName" @click="useDarkThemeChange(!isDark)"></svg-icon>
</template>

<style lang="scss" scoped>
.svg {
  cursor: pointer;
  &:hover {
    transform: scale(1.2, 1.2);
  }
}
</style>
