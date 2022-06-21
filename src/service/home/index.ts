import { instance } from '../index'
import '@/mock/index.ts'
export function getGeneralData() {
  return instance.get('/getGeneralData')
}
