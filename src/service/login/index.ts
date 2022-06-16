import { instance } from '../index'
import type { IAccount } from './type'

export function loginRequest(account: IAccount) {
  return instance.post('/login', account)
}
