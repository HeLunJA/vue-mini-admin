let baseURL: string = process.env.VITE_BASE_API as string
const TIME_OUT: number = 10000

//开发环境请求/api开启跨域代理
const mode = import.meta.env.MODE
if (mode === 'development') {
  baseURL = '/api'
}

export { baseURL, TIME_OUT }
