import type { RouteRecordRaw } from 'vue-router'
type metaType = {
  componentPath: string | null,
  label: string,
  icon: string
}
type route = {
  meta: metaType,
  children: routerItem[]
}
export type routerItem = RouteRecordRaw & route

export type accountType = {
  name: string
  password: string
}

