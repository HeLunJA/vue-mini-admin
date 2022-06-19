import type { routerItem } from '@/types'
const modules = import.meta.glob('../views/**/**.vue')
export default function setRouter(list: routerItem[]): routerItem[] {
  list.map((item) => {
    item.meta = { label: item.label }
    item.componentPath && (item.component = modules[`../views/main${item.componentPath}.vue`])
    if (item.children && item.children.length) {
      item.component = () => import('@/layout/layout.vue')
      setRouter(item.children)
    }
  })
  return list
}
