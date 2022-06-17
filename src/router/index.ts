import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layout/layout.vue'),
    children: [
      { name: 'home', path: 'home', component: () => import('@/views/main/home/home.vue'), meta: { label: '首页' } }
    ]
  },
  {
    path: '/cs1',
    name: 'cs1',
    redirect: '/cs1/set1',
    component: () => import('@/layout/layout.vue'),
    meta: { label: '测试目录1' },
    children: [
      {
        name: 'set1',
        path: 'set1',
        component: () => import('@/views/main/cs1/cs1.vue'),
        meta: { label: '设置1' }
      },
      {
        name: 'set11',
        path: 'set11',
        component: () => import('@/views/main/cs2/cs2.vue'),
        meta: { label: '设置11' }
      }
    ]
  },
  {
    path: '/cs2',
    name: 'cs2',
    redirect: '/cs2/set2',
    component: () => import('@/layout/layout.vue'),
    meta: { label: '测试目录2' },
    children: [
      { name: 'set2', path: 'set2', component: () => import('@/views/main/cs2/cs2.vue'), meta: { label: '设置2' } }
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

router.beforeEach((router) => {})

export default router
