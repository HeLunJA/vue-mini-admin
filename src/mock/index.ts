import { MockMethod } from 'vite-plugin-mock'
import { login, routerList } from './login'
import { generalData, getTableData, editTableData } from './data'
export default [login, routerList, generalData, getTableData, editTableData] as MockMethod[]
