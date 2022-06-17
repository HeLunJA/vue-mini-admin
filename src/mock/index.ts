import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
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
] as MockMethod[]
