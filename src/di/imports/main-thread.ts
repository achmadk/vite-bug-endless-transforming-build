import { AxiosInstance } from 'axios'

import { container } from './shared'

import { AnotherSample, ANOTHER_SAMPLE, initRemoteService, REMOTE_SERVICE, sample, SAMPLE, TEST_HOOKS, useTestHooks } from '@/implementations'

import { IAnotherSample, ISample, ITestHandler } from '@/interfaces'

// container.bind<ISample>(SAMPLE).toConstantValue(sample)
// container.addTransient<IAnotherSample>(AnotherSample, ANOTHER_SAMPLE)
container.bind<ITestHandler>(TEST_HOOKS).toDynamicValue(() => useTestHooks())
container.bind<AxiosInstance>(REMOTE_SERVICE).toDynamicValue(() => initRemoteService())
