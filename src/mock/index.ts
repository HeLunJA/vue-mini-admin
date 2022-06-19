import { MockMethod } from 'vite-plugin-mock'
import { login, routerList } from './login'

export default [login, routerList] as MockMethod[]
