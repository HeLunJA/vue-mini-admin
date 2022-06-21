import { instance } from '../index'
import '@/mock/index.ts'
export function login(account: IAccountType) {
  return instance.post('/login', account)
}

export function getRouterList() {
  return instance.get('/getRouterList')
}
