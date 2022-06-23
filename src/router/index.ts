import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useGlobalStore } from '@/store/global'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
    name: 'main',
    component: () => import('@/layout'),
    children: [
      { name: 'home', path: 'home', component: () => import('@/views/main/home'), meta: { label: '首页概况' } }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore()
  if (!globalStore.token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (globalStore.routerList.length) {
      next()
    } else {
      const routerList: TRouterItem[] = await globalStore.getRouter()
      routerList.forEach((route) => {
        router.addRoute(route)
      })
      next({ path: to.path as string, replace: true })
    }
  }
})

export default router
export { routes }
