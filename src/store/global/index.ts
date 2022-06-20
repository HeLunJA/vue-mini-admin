import { defineStore } from 'pinia'
import router from '@/router'
import { routerItem } from '@/types'
import setRouter from '@/utils/setRouter'
import { getRouterList } from '@/service/login'
type tabItem = {
  label: string
  name: string
  path: string
}
type globalState = {
  token: string
  tabList: tabItem[]
  routerList: routerItem[]
}
export const useGlobalStore = defineStore({
  id: 'tab',
  state: (): globalState => {
    return {
      token: '',
      tabList: [{ name: 'home', path: '/home', label: '首页' }],
      routerList: []
    }
  },
  actions: {
    updateRouterList(list: routerItem[]) {
      this.routerList = setRouter(list)
    },
    updateToken(token: string) {
      this.token = token
    },
    updateTabList(list: tabItem[]) {
      this.tabList = list
    },
    addTab(tab: tabItem) {
      const isTab = this.tabList.every((item) => item.name !== tab.name)
      if (isTab) {
        this.tabList.push(tab)
      }
    },
    removeTab(name: string, routeName: string) {
      if (this.tabList.length === 1) return
      const index = this.tabList.findIndex((item) => item.name === name)
      this.tabList.splice(index, 1)

      if (routeName === name) {
        router.push({
          name: this.tabList[this.tabList.length - 1].name
        })
      }
    },
    getRouter() {
      return new Promise<routerItem[]>(async (resolve) => {
        if (this.routerList.length) {
          resolve(this.routerList)
        } else {
          const result = await getRouterList()
          this.updateRouterList(result.data.list)
          resolve(this.routerList)
        }
      })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['tabList', 'token']
      }
    ]
  }
})
