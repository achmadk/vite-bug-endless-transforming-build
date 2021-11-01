import { Remote, wrap } from "comlink"

export async function executeWebWorker<WebWorkerMethods = unknown, ReturnType = void>(worker: Worker, callback: (comlink: Remote<WebWorkerMethods>) => ReturnType) {
  try {
    const comlinkRef = wrap<WebWorkerMethods>(worker)
    return await callback(comlinkRef)
  } catch (error) {
    throw error
  } finally {
    worker.terminate()
  }
}
