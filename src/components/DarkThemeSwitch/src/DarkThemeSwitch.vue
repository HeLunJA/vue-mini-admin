<script setup lang="ts">
import { computed, watch } from 'vue'
import { useSwitchDark, useDarkThemeChange } from '@/hooks/useChangeTheme'
import { setStyleVar } from '@/utils/setTheme'
import {
  THEME_BORDER_COLOR,
  THEME_BORDER_COLOR_DARK,
  THEME_BORDER_COLOR_LIGHT,
  THEME_CARD_BGC_COLOR,
  THEME_CARD_BGC_COLOR_DARK,
  THEME_CARD_BGC_COLOR_LIGHT,
  BASE_BGC_COLOR,
  BASE_BGC_COLOR_DARK,
  BASE_BGC_COLOR_LIGHT
} from '@/enums/theme'
import Sun from './components/Sun.vue'
import Moon from './components/Moon.vue'
type changeType = (val: string | number | boolean) => any
const isDark = useSwitchDark()
const switchColor = computed(() => (isDark.value ? '#1d1e1f' : '#606266'))
watch(
  () => isDark.value,
  (val) => {
    if (val) {
      setStyleVar(THEME_BORDER_COLOR, THEME_BORDER_COLOR_DARK, document.documentElement)
      setStyleVar(THEME_CARD_BGC_COLOR, THEME_CARD_BGC_COLOR_DARK, document.documentElement)
      setStyleVar(BASE_BGC_COLOR, BASE_BGC_COLOR_DARK, document.documentElement)
    } else {
      setStyleVar(THEME_BORDER_COLOR, THEME_BORDER_COLOR_LIGHT, document.documentElement)
      setStyleVar(THEME_CARD_BGC_COLOR, THEME_CARD_BGC_COLOR_LIGHT, document.documentElement)
      setStyleVar(BASE_BGC_COLOR, BASE_BGC_COLOR_LIGHT, document.documentElement)
    }
  },
  { immediate: true }
)
const handleChange = useDarkThemeChange as changeType
</script>

<template>
  <el-switch
    class="switch"
    :value="isDark"
    @change="handleChange"
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
