import { MockMethod } from 'vite-plugin-mock'
// 登录接口
const login: MockMethod = {
  url: '/api/mockLogin',
  method: 'post',
  timeout: 500,
  response: (data: any) => {
    const { name, password } = data.body
    if (name === 'admin' && password === '123456') {
      return {
        msg: '登录成功!',
        code: '0000',
        data: {
          token: 'be46064e-ca72-451a-914a-6b1e11d68bb6'
        }
      }
    } else {
      return {
        msg: '账号或者密码错误!',
        code: '9999',
        data: null
      }
    }
  }
}
// 登录后拿到的路由菜单
const routers: any = [
  {
    name: 'componentViews',
    path: '/componentViews',
    meta: {
      label: '常用组件',
      icon: 'Edit',
      componentPath: null
    },
    children: [
      {
        path: 'dynamicTable',
        name: 'table',
        meta: {
          label: '表格组件',
          icon: 'Edit',
          componentPath: '/componentViews/DynamicTable'
        }
      }
    ]
  }
]
const routerList: MockMethod = {
  url: '/api/mockGetRouterList',
  method: 'get',
  timeout: 200,
  response: () => {
    return {
      list: routers
    }
  }
}

export { login, routerList }
