
// this is required to ensure that different
// class hierarchies are not mixed up
// using symbol does not reduce set of available
// identifiers for methods and properties in child classes
// making property private allow to forget completely forget about it
const discriminant = Symbol()

// generalCapability interface should restrict only part of 
export interface IGeneralCapability<R> {
  [key: string]: (...args: any[]) => R
}

export type test<T, R> = {
  [key in keyof T]: (...args: any[]) => R
}

export abstract class BaseAction<T> {
  private [discriminant]: undefined

  abstract getImplementationDetails<R>(capability: test<T, R>): R

}

// method should return what capability returns. 
// But what capability returns does not matter
// capability is function. Capability should comply desired interface