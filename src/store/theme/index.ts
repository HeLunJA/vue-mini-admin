import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { IThemeState } from './type'
export const themeStore = defineStore({
  id: 'theme',
  state: (): IThemeState => {
    return {
      isDark: useDark(),
      isCollapse: false
    }
  },
  actions: {
    updateCollapse() {
      this.isCollapse = !this.isCollapse
    },
    updateDark(isDark: boolean) {
      this.isDark = isDark
    }
  }
})
