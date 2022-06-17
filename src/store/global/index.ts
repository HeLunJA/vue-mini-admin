import { defineStore } from 'pinia'
import type { IGlobalState } from './type'
export const useGlobalStore = defineStore({
  id: 'global',
  state: (): IGlobalState => {
    return {
      token: ''
    }
  },
  actions: {
    updateToken(token: string) {
      this.token = token
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        paths: ['token']
      }
    ]
  }
})
