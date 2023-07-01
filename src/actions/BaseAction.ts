
// this is required to ensure that different
// class hierarchies are not mixed up
// using symbol does not reduce set of available
// identifiers for methods and properties in child classes
// making property private allow to forget completely forget about it
const discriminant = Symbol()

type CallableKeyOf<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? P : never;
}[keyof T];

export type Callable<T> = Pick<T, CallableKeyOf<T>>;

type AllMethodsReturn<R, T extends Callable<T>> = {
  [Key in keyof T]: (...args: Parameters<T[Key]>) => R
}

export abstract class BaseAction<T> {
  private [discriminant]: undefined

  abstract getImplementationDetails<R>(visitor: AllMethodsReturn<R, Callable<T>>): R

}

// method should return what capability returns. 
// But what capability returns does not matter
// capability is function. Capability should comply desired interface