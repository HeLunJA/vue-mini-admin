<script setup lang="ts">
import { computed } from 'vue'
import { useSwitchDark, useDarkThemeChange } from '@/hooks/useChangeTheme'
import Sun from './components/Sun.vue'
import Moon from './components/Moon.vue'
const isDark = useSwitchDark()
const switchColor = computed(() => (isDark.value ? '#1d1e1f' : '#606266'))
</script>

<template>
  <el-switch
    class="switch"
    :value="isDark"
    @change="useDarkThemeChange"
    inline-prompt
    :active-icon="Sun"
    :inactive-icon="Moon"
  />
</template>

<style lang="scss" scoped>
.switch {
  :deep(.el-switch__core) {
    background-color: v-bind(switchColor);
  }
}
</style>
