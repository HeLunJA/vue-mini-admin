import { MockMethod } from 'vite-plugin-mock'

const statusList = {
  data: [
    { label: '全部', value: 0 },
    { label: '待审核', value: 1 }
  ]
}

export default [
  {
    url: '/api/login',
    method: 'post',
    response: (data: any) => {
      const { name, password } = data.body
      return null
    }
  },
  {
    url: '/api/getStatusList',
    method: 'get',
    response: () => {
      return statusList
    }
  }
] as MockMethod[]
