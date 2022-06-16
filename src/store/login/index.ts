import { defineStore } from 'pinia'
import { ILoginState } from './type'
export const useLoginStore = defineStore({
  id: 'login',
  state: (): ILoginState => {
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
