import { inject } from 'inversify-hooks-esm'

import { IAnotherSample, ISample } from "@/interfaces";
import { SAMPLE } from './sample';

// export const ANOTHER_SAMPLE = Symbol('AnotherSample')
export const ANOTHER_SAMPLE = 'AnotherSample'

export class AnotherSample<ResourceType extends ISample = ISample> implements IAnotherSample<ResourceType> {
    @inject(SAMPLE)
    sample!: ISample

    getUserId(): ResourceType["id"] {
        return this.sample.id
    }
    getUserName(): ResourceType["name"] {
        return this.sample.name
    }
    getUserAge(): ResourceType["age"] {
        return this.sample.age
    }

}