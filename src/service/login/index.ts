import { instance } from '../index'
import type { IAccount } from './type'
import '@/mock/index.ts'
export function login(account: IAccount) {
  return instance.post('/login', account)
}

export function getRouterList() {
  return instance.get('/getRouterList')
}
