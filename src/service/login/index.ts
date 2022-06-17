import { instance } from '../index'
import type { IAccount } from './type'
import '../../mock/index.ts'
export function loginRequest(account: IAccount) {
  return instance.post('/login', account)
}
