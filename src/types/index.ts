import type { RouteRecordRaw } from 'vue-router'
type route = {
  componentPath?: string
  icon: string
  label: string
  children: routerItem[]
}
export type routerItem = RouteRecordRaw & route
