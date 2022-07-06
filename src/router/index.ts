import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/store/global'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
    name: 'main',
    component: () => import('@/layout/pageLayout.vue'),
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/HomePage/HomePage.vue'),
        meta: { label: '首页概况' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage/LoginPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound/NotFound.vue')
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
      if (globalStore.token) {
        const routerList: TRouterItem[] = await globalStore.getRouter()
        routerList.forEach((route) => {
          router.addRoute(route)
        })
        next({ path: to.path, replace: true })
      } else {
        next()
      }
    }
  }
})

export default router
export { routes }
