import { expose } from 'comlink'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { container } from '@/di/imports/web-worker'

import { SAMPLE } from '@/implementations'

import { ISample } from '@/interfaces'

export const AXIOS_INTEGRATION_PLUGIN = 'AxiosIntegrationPlugin'

const test = container.get<ISample>(SAMPLE)
const instance = axios.create({ baseURL: test.backendURL })

const get = async function<T = any, R extends AxiosResponse<T, any> = AxiosResponse<T, any>, D = any>(url: string, options?: AxiosRequestConfig<D>): Promise<R> {
  try {
    const response = await instance.get<T, R, D>(url, options)
    return { data: response.data } as unknown as R
  } finally {
    self.close()
  }
}

const post = async function<T = any, R extends AxiosResponse<T, any> = AxiosResponse<T, any>, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
  try {
    const response = await instance.post<T, R, D>(url, data, options)
    return { data: response.data } as unknown as R
  } finally {
    self.close()
  }
}

const put = async function<T = any, R extends AxiosResponse<T, any> = AxiosResponse<T, any>, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
  try {
    const response = await instance.put<T, R, D>(url, data, options)
    return { data: response.data } as unknown as R
  } finally {
    self.close()
  }
}

const patch = async function<T = any, R extends AxiosResponse<T, any> = AxiosResponse<T, any>, D = any>(url: string, data?: D, options?: AxiosRequestConfig<D>): Promise<R> {
  try {
    const response = await instance.patch<T, R, D>(url, data, options)
    return { data: response.data } as unknown as R
  } finally {
    self.close()
  }
}

/**
 * you can't directly create variable named `delete` because its reserved by javascript
 */
const remove = async function<T = any, R extends AxiosResponse<T, any> = AxiosResponse<T, any>, D = any>(url: string, options?: AxiosRequestConfig<D>): Promise<R> {
  try {
    const response = await instance.delete<T, R, D>(url, options)
    return { data: response.data } as unknown as R
  } finally {
    self.close()
  }
}

const worker = {
  get,
  post,
  put,
  patch,
  delete: remove,
} as AxiosInstance

export type AxiosIntegrationWorkerType = AxiosInstance

expose(worker)
