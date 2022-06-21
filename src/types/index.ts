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
  /**路由列表子路由类型 */
  type TRouterItem = RouteRecordRaw & route
  /**登录后台传入的data对象接口 */
  interface IAccountType {
    name: string
    password: string
  }
}
