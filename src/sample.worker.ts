import { expose } from 'comlink'

import { container } from '@/di/imports/web-worker'

import { SAMPLE } from '@/implementations'

import { ISample } from '@/interfaces'

const getTest = () => {
  const test = container.get<ISample>(SAMPLE)
  return test
}

const worker = { getTest }

export type SampleWorker = typeof worker

expose({ getTest })
