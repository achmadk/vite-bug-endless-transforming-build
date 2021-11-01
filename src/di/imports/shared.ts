import { container as defaultContainer } from 'inversify-hooks-esm'

import { AnotherSample, ANOTHER_SAMPLE, sample, SAMPLE } from '@/implementations'

import { IAnotherSample, ISample } from '@/interfaces'

defaultContainer.bind<ISample>(SAMPLE).toConstantValue(sample)
defaultContainer.addTransient<IAnotherSample>(AnotherSample, ANOTHER_SAMPLE)

export const container = defaultContainer
