import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import type { WritableComputedRef } from 'vue'
type themeState = {
  isDark: WritableComputedRef<boolean>,
  isCollapse: boolean
}
export const themeStore = defineStore({
  id: 'theme',
  state: (): themeState => {
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
