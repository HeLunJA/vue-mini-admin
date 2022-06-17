import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { baseURL, TIME_OUT } from './config'

const config: AxiosRequestConfig = {
  baseURL: baseURL,
  timeout: TIME_OUT
}

const instance: AxiosInstance = axios.create(config)
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log(config)
    return config
  },
  (err) => {
    console.log(err)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  (config) => {
    console.log(config)
    return config
  },
  (err) => {
    console.log(err)
  }
)
export { instance }
