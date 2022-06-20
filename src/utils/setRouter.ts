import type { routerItem } from '@/types'
const modules = import.meta.glob('../views/**/**.vue')
export default function setRouter(list: routerItem[]): routerItem[] {
  list.map((item) => {
    item.meta.componentPath && (item.component = modules[`../views/main${item.meta.componentPath}.vue`])
    if (item.children && item.children.length) {
      item.component = () => import('@/layout/layout.vue')
      setRouter(item.children)
    }
  })
  return list
}
