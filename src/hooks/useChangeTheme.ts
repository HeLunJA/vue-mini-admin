import { themeStore } from '@/store/theme'
const store = themeStore()
function useSwitchDark() {
  const isDark = computed(() => store.isDark)
  return isDark
}
function useDarkThemeChange(isDark: boolean) {
  store.updateDark(isDark)
} 

export { useSwitchDark, useDarkThemeChange }
