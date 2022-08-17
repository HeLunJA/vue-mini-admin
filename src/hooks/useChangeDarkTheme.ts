import { themeStore } from '@/store/theme'
const store = themeStore()
export default function useChangeDarkTheme() {
  const isDark = computed(() => store.isDark)
  function changeTheme(isDark: boolean) {
    store.updateDark(isDark)
  }
  return { isDark, changeTheme }
}
