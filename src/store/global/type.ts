import type { RouteRecordName } from 'vue-router'
export interface ItabItem {
  label: string
  name: RouteRecordName
  path: string
}
export interface IGlobalState {
  token: string
  tabList: ItabItem[]
}
