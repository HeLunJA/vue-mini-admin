import { defineStore } from 'pinia'
import type { IGlobalState, ItabItem } from './type'
import router from '@/router'
export const useGlobalStore = defineStore({
  id: 'tab',
  state: (): IGlobalState => {
    return {
      token: '',
      tabList: [{ name: 'home', path: '/home', label: '首页' }]
    }
  },
  actions: {
    updateToken(token: string) {
      this.token = token
    },
    updateTabList(list: ItabItem[]) {
      this.tabList = list
    },
    addTab(tab: ItabItem) {
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
