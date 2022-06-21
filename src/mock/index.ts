import { MockMethod } from 'vite-plugin-mock'
import { login, routerList, generalData } from './login'

export default [login, routerList, generalData] as MockMethod[]
