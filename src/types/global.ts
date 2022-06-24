import type { RouteRecordRaw } from 'vue-router'
type metaType = {
  componentPath: string | null
  label: string
  icon: string
}
type route = {
  meta: metaType
  children: TRouterItem[]
}
declare global {
  type TRouterItem = RouteRecordRaw & route
  interface IAccountType {
    name: string
    password: string
  }
}
