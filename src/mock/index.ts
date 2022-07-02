import { MockMethod } from 'vite-plugin-mock'
import { login, routerList } from './login'
import { generalData, getTableData } from './data'
export default [login, routerList, generalData, getTableData] as MockMethod[]
