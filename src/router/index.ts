import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useGlobalStore } from '@/store/global'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
    name: 'main',
    component: () => import('@/layout/layout.vue'),
    children: [
      { name: 'home', path: 'home', component: () => import('@/views/main/home/home.vue'), meta: { label: '首页' } }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
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

router.beforeEach((to, from, next) => {
  const globalStore = useGlobalStore()
  if (!globalStore.token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router
export { routes }
