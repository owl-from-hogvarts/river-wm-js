/* 
    Copyright (C) 2023  owl-from-hogvarts

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/


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