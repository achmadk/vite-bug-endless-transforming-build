import { useState, useCallback, useEffect } from 'react'

import { ITestHandler } from '@/interfaces'

// export const TEST_HOOKS = Symbol.for('TEST')
export const TEST_HOOKS = 'TEST_HOOKS'

export function useTestHooks(): ITestHandler {
  const [state, setState] = useState(true)
  const [triggerUpdateWhenStateIsTrue, setTriggerUpdateWhenStateIsTrue] = useState(false)

  const toggleState = useCallback((value?: boolean) => {
    setState((prevValue) => typeof value === 'boolean' ? value : !prevValue)
  }, [])

  useEffect(() => {
    if (state) {
      setTriggerUpdateWhenStateIsTrue(true)
    }
  }, [state])

  useEffect(() => {
    if (triggerUpdateWhenStateIsTrue) {
      console.log('hello, updated state to true')
      setTriggerUpdateWhenStateIsTrue(false)
    }
  })

  return {
    state,
    toggleState,
  }
}