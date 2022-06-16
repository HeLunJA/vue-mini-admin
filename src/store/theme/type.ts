import type { WritableComputedRef } from 'vue'
export interface IThemeState {
  isDark: WritableComputedRef<boolean>,
  isCollapse: boolean
}