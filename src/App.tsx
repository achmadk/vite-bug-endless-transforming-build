import React, { useState, useCallback, useEffect } from 'react'
import { useInject, container } from 'inversify-hooks-esm'
import { AxiosInstance } from 'axios'

import { SampleWorker } from './sample.worker'
import SmpWorker from './sample.worker?worker'

import logo from './logo.svg'

import { ANOTHER_SAMPLE, REMOTE_SERVICE, TEST_HOOKS } from './implementations'
import { executeWebWorker } from './utils'

import { IAnotherSample, ISample, ITestHandler } from './interfaces'

import './App.css'

function App<ResourceType extends ISample = ISample>() {
  const [anotherSample] = useInject<IAnotherSample<ResourceType>>(ANOTHER_SAMPLE)
  const [testHandler] = useInject<ITestHandler>(TEST_HOOKS)
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    try {
      setCount((count) => count + 1)
      const result = await executeWebWorker<SampleWorker>(new SmpWorker(), async (worker) => await worker.getTest())
      console.log('result: ', result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickAnotherButton = useCallback(() => {
    testHandler.toggleState()
  }, [])

  const initApp = useCallback(async () => {
    const remoteService = container.get<AxiosInstance>(REMOTE_SERVICE)
    const response = await remoteService.get('/list')
    console.log('response: ', response)
  }, [container])

  useEffect(() => {
    initApp()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{anotherSample.getUserId()}</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count} {anotherSample.getUserName()}
          </button>
        </p>
        <p>
          <button type="button" onClick={handleClickAnotherButton}>
            {`count is: ${testHandler.state}`}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Learn React ${anotherSample.getUserAge()}`}
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
