
// this is required to ensure that different
// class hierarchies are not mixed up
// using symbol does not reduce set of available
// identifiers for methods and properties in child classes
// making property private allow to forget completely forget about it
const discriminant = Symbol()

export abstract class BaseAction {
  private [discriminant]: undefined
}