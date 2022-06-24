import axios from 'axios'
import { useGlobalStore } from '@/store/global'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { baseURL, TIME_OUT } from './config'

const config: AxiosRequestConfig = {
  baseURL: baseURL,
  timeout: TIME_OUT
}

const instance: AxiosInstance = axios.create(config)
// 请求拦截器
instance.interceptors.request.use((config) => {
  const globalStore = useGlobalStore()
  return globalStore.token ? { ...config, headers: { token: globalStore.token } } : config
})
// 响应拦截器
instance.interceptors.response.use((config) => {
  return config
})
export { instance }
