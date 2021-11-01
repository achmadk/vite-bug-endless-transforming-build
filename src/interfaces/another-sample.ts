import { ISample } from ".";

export interface IAnotherSample<ResourceType extends ISample = ISample> {
  getUserId(): ResourceType['id']
  getUserName(): ResourceType['name']
  getUserAge(): ResourceType['age']
}