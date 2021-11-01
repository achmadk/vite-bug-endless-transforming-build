import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import AxiosIntegrationWorker from '@/utils/third-parties/axios.worker?worker'
import { AxiosIntegrationWorkerType } from '@/utils/third-parties/axios.worker'
import { executeWebWorker } from '@/utils'


export const REMOTE_SERVICE = 'RemoteService'

export function initRemoteService(): AxiosInstance {
  const worker = new AxiosIntegrationWorker()
  return {
      get: async function<T = any, R extends AxiosResponse<T> = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
        return await executeWebWorker<AxiosIntegrationWorkerType>(worker, async (instance) => {
          const castedInstance = instance as unknown as AxiosInstance
          return await castedInstance.get<T, R, D>(url, config)
        })
      },
      post: async function<T = any, R extends AxiosResponse<T> = AxiosResponse<T>, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>) {
        return await executeWebWorker<AxiosIntegrationWorkerType>(worker, async (instance) => {
          const castedInstance = instance as unknown as AxiosInstance
          return await castedInstance.post<T, R, D>(url, data, config)
        })
      },
      put: async function<T = any, R extends AxiosResponse<T> = AxiosResponse<T>, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>) {
        return await executeWebWorker<AxiosIntegrationWorkerType>(worker, async (instance) => {
          const castedInstance = instance as unknown as AxiosInstance
          return await castedInstance.put<T, R, D>(url, data, config)
        })
      },
      patch: async function<T = any, R extends AxiosResponse<T> = AxiosResponse<T>, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>) {
        return await executeWebWorker<AxiosIntegrationWorkerType>(worker, async (instance) => {
          const castedInstance = instance as unknown as AxiosInstance
          return await castedInstance.patch<T, R, D>(url, data, config)
        })
      },
      delete: async function<T = any, R extends AxiosResponse<T> = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
        return await executeWebWorker<AxiosIntegrationWorkerType>(worker, async (instance) => {
          const castedInstance = instance as unknown as AxiosInstance
          return await castedInstance.delete<T, R, D>(url, config)
        })
      }
  } as AxiosInstance
}
