const modules = import.meta.glob('../views/**/**.vue')
export default function setRouter(list: TRouterItem[]): TRouterItem[] {
  list.map((item) => {
    item.meta.componentPath && (item.component = modules[`../views${item.meta.componentPath}.vue`])
    if (item.children && item.children.length) {
      item.component = () => import('@/layout')
      setRouter(item.children)
    }
  })
  return list
}
