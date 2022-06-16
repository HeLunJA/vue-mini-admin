import { defineStore } from 'pinia'
import { IbreadItem, IbreadState } from './type'
import type { RouteLocationMatched } from 'vue-router'
export const breadStore = defineStore({
  id: 'bread',
  state: (): IbreadState => {
    return {
      breadList: []
    }
  },
  actions: {
    updateBreadList(list: RouteLocationMatched[]) {
      const breadList: IbreadItem[] = list.map((item): IbreadItem => {
        console.log(item)

        return {
          label: item.meta.label as string,
          path: item.path,
          name: item.name as string,
          isAllowedToJump: item.children.length ? false : true
        }
      })
      this.breadList = breadList
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['breadList']
      }
    ]
  }
})
