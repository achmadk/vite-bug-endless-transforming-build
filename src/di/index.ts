import 'reflect-metadata'

import { container } from 'inversify-hooks-esm'

import { AnotherSample, ANOTHER_SAMPLE, SAMPLE, TEST_HOOKS, useTestHooks } from '@/implementations'

import { IAnotherSample, ISample, ITestHandler } from '@/interfaces'

// @ts-ignore
container.bind<ISample>(SAMPLE).toConstantValue(TEST)
container.addTransient<IAnotherSample>(AnotherSample, ANOTHER_SAMPLE)
container.bind<ITestHandler>(TEST_HOOKS).toDynamicValue(() => useTestHooks())

export default container
