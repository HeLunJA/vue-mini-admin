import { instance } from '../index'
import type { accountType } from '@/types'
import '@/mock/index.ts'
export function login(account: accountType) {
  return instance.post('/login', account)
}

export function getRouterList() {
  return instance.get('/getRouterList')
}
